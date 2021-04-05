import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import VideoCard from "./VideoCard";
import TwitchLogin from "./TwitchLogin";
import Loading from "../Loading";
import {
  fetchSelectedLiveGamingStreams,
  fetchSelectedUserInfo,
  refreshSelectedLiveGamingStreams,
} from "../../actions";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
  text: {
    borderBottom: `4px solid ${theme.palette.secondary.main}`,
    flex: 1,
    padding: "20px",
    marginLeft: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  tabHeading: {
    color: "#c9c9c9",
    fontSize: "2rem",
    marginLeft: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  gameImg: {
    margin: "10px",
  },
}));

export const StreamsDashboard = ({
  accessToken,
  selectedGameStreams,
  fetchSelectedLiveGamingStreams,
  selectedGameUsers,
  fetchSelectedUserInfo,
  refreshSelectedLiveGamingStreams,
  location: { game },
}) => {
  const classes = useStyles();
  // declare ref variable that references the last stream card visible in the viewport
  // while in infinite scroll
  const lastCardRef = useRef(null);
  // streamsFetched state variable indicates when to fetch the data of streamers
  // only after the respective streams have been fetched
  let [streamsFetched, setStreamsFetched] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    if (accessToken) {
      // if the user is logged in then only we can have "game" object
      // else we need to get the game by parsing the location and calling some fetch function
      setThumbnailUrl(
        game.box_art_url.replace(/{width}x{height}/g, `${170}x${226}`)
      );
    }
  }, [accessToken, thumbnailUrl, game]);

  useEffect(() => {
    if (
      accessToken &&
      Object.keys(selectedGameStreams).length &&
      selectedGameStreams.data[0].game_id !== game.id
    ) {
      // if user changes the selected game then we remove all previous game data
      // and reinitialize "selectedGameStreams" to empty object
      refreshSelectedLiveGamingStreams();
    }
  }, [
    accessToken,
    selectedGameStreams,
    refreshSelectedLiveGamingStreams,
    game,
  ]);

  useEffect(() => {
    if (accessToken && !Object.keys(selectedGameStreams).length) {
      // fetch the gaming streams of selected game in the initial render
      fetchSelectedLiveGamingStreams(accessToken, game.id);
    }

    // "Intersection Observer" used for infinite scroll
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const [entity] = entities;
      if (entity.isIntersecting && selectedGameStreams.pagination.cursor) {
        // if last card if in the viewport and we have cursor to fetch next results

        // first remove currently observed last card reference so as to avoid calling
        // with same cursor repeatedly
        observer.unobserve(lastCardRef.current);
        // fetch the next results
        fetchSelectedLiveGamingStreams(
          accessToken,
          game.id,
          selectedGameStreams.pagination.cursor
        );
        setStreamsFetched(true);
      }
    }, options);

    if (lastCardRef.current) {
      // if the last card has been rendered but is not on the viewport yet,
      // start observing the card
      observer.observe(lastCardRef.current);
    }
  }, [
    accessToken,
    selectedGameStreams,
    fetchSelectedLiveGamingStreams,
    lastCardRef,
    game,
  ]);

  useEffect(() => {
    if (accessToken && Object.keys(selectedGameStreams).length) {
      if (streamsFetched) {
        // the streams have been fetched only then fetch the last 20 users
        const userIds = selectedGameStreams.data
          .slice(-20)
          .map((stream) => stream.user_id);
        const usersToFetch = userIds.join().replace(/,/g, "&id=");
        fetchSelectedUserInfo(accessToken, usersToFetch);
        // set streamsFetched to false so in next request, the process can be repeated
        setStreamsFetched(false);
      }
    }
  }, [selectedGameStreams, fetchSelectedUserInfo, accessToken, streamsFetched]);

  const renderSearchCards = () => {
    return selectedGameStreams.data.map((stream, index) => {
      if (selectedGameStreams.data.length - 1 === index) {
        // if the card is last in streams list then set ref in it
        return (
          <Grid item key={stream.id}>
            <VideoCard
              innerRef={lastCardRef}
              users={selectedGameUsers}
              stream={stream}
              width={288}
              height={158}
            />
          </Grid>
        );
      } else {
        // else no need to set ref
        return (
          <Grid item key={stream.id}>
            <VideoCard
              users={selectedGameUsers}
              stream={stream}
              width={288}
              height={158}
            />
          </Grid>
        );
      }
    });
  };

  return (
    <Grid container justify="center" spacing={0} className={classes.root}>
      {!accessToken ? (
        <TwitchLogin />
      ) : !Object.keys(selectedGameStreams).length ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Grid
            item
            container
            xs={12}
            justify="center"
            className={classes.bannerDiv}
          >
            <img
              className={classes.gameImg}
              src={thumbnailUrl}
              alt={game.name}
            />
            <Typography variant="h2" className={classes.text}>
              {game.name}
            </Typography>
          </Grid>
          ,
          <Grid item container xs={12}>
            <Typography variant="h5" className={classes.tabHeading}>
              Live Streams
            </Typography>
          </Grid>
          ,{renderSearchCards()}
        </React.Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  accessToken: state.accessToken,
  selectedGameStreams: state.selectedGameStreams,
  selectedGameUsers: state.selectedGameUsers,
});

const mapDispatchToProps = {
  fetchSelectedLiveGamingStreams,
  fetchSelectedUserInfo,
  refreshSelectedLiveGamingStreams,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamsDashboard);
