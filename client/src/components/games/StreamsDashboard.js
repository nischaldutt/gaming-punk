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
  const lastCardRef = useRef(null);
  let [streamsFetched, setStreamsFetched] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    if (accessToken) {
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
      fetchSelectedLiveGamingStreams(accessToken, game.id);
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const [entity] = entities;
      if (entity.isIntersecting && selectedGameStreams.pagination.cursor) {
        observer.unobserve(lastCardRef.current);
        fetchSelectedLiveGamingStreams(
          accessToken,
          game.id,
          selectedGameStreams.pagination.cursor
        );
        setStreamsFetched(true);
      }
    }, options);

    if (lastCardRef.current) {
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
        const userIds = selectedGameStreams.data
          .slice(-20)
          .map((stream) => stream.user_id);
        const usersToFetch = userIds.join().replace(/,/g, "&id=");
        fetchSelectedUserInfo(accessToken, usersToFetch);
        setStreamsFetched(false);
      }
    }
  }, [selectedGameStreams, fetchSelectedUserInfo, accessToken, streamsFetched]);

  const renderSearchCards = () => {
    return selectedGameStreams.data.map((stream, index) => {
      if (selectedGameStreams.data.length - 1 === index) {
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
