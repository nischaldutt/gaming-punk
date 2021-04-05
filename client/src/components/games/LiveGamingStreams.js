import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchLiveGamingStreams, fetchUserInfo } from "../../actions";
import VideoCard from "./VideoCard";
import Loading from "../Loading";

import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import theme from "../../themes";

const useStyles = makeStyles((theme) => ({
  root: {},
  streamsDiv: {
    paddingTop: "10px",
  },
}));

const LiveGamingStreams = ({
  accessToken,
  userInfo,
  liveGamingStreams,
  fetchLiveGamingStreams,
  fetchUserInfo,
}) => {
  const classes = useStyles();
  // declare ref variable that references the last stream card visible in the viewport
  // while in infinite scroll
  const lastCardRef = useRef(null);
  // streamsFetched state variable indicates when to fetch the data of streamers
  // only after the respective streams have been fetched
  let [streamsFetched, setStreamsFetched] = useState(false);

  useEffect(() => {
    if (accessToken && !Object.keys(liveGamingStreams).length) {
      // fetch the gaming streams in the initial render
      fetchLiveGamingStreams(accessToken);
    } else if (
      Object.keys(liveGamingStreams.data).length &&
      !Object.keys(userInfo).length
    ) {
      // fetch streamers data only after fetching the respective streams
      const userIds = liveGamingStreams.data.map((stream) => stream.user_id);
      // create string of user ids in order to pass them to the action creator for fetching
      const usersToFetch = userIds.join().replace(/,/g, "&id=");
      fetchUserInfo(accessToken, usersToFetch);
    }
  }, [
    liveGamingStreams,
    accessToken,
    fetchLiveGamingStreams,
    userInfo,
    fetchUserInfo,
  ]);

  useEffect(() => {
    // "Intersection Observer" used for infinite scroll
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const [entity] = entities;
      if (entity.isIntersecting && liveGamingStreams.pagination.cursor) {
        // if last card if in the viewport and we have cursor to fetch next results

        // first remove currently observed last card reference so as to avoid calling
        // with same cursor repeatedly
        observer.unobserve(lastCardRef.current);
        // fetch the next results
        fetchLiveGamingStreams(
          accessToken,
          liveGamingStreams.pagination.cursor
        );
        setStreamsFetched(true);
      }
    }, options);

    if (lastCardRef.current) {
      // if the last card has been rendered but is not on the viewport yet,
      // start observing the card
      observer.observe(lastCardRef.current);
    }
  }, [accessToken, liveGamingStreams, fetchLiveGamingStreams]);

  useEffect(() => {
    if (accessToken && Object.keys(liveGamingStreams).length) {
      if (streamsFetched) {
        // the streams have been fetched only then fetch the last 20 users
        const userIds = liveGamingStreams.data
          .slice(-20)
          .map((stream) => stream.user_id);
        const usersToFetch = userIds.join().replace(/,/g, "&id=");
        fetchUserInfo(accessToken, usersToFetch);
        // set streamsFetched to false so in next request, the process can be repeated
        setStreamsFetched(false);
      }
    }
  }, [
    liveGamingStreams,
    fetchLiveGamingStreams,
    fetchUserInfo,
    accessToken,
    streamsFetched,
  ]);

  const renderGamingStreams = () => {
    return liveGamingStreams.data.map((stream, index) => {
      if (liveGamingStreams.data.length - 1 === index) {
        // if the card is last in streams list then set ref in it
        return (
          <Grid item key={stream.id}>
            <VideoCard
              innerRef={lastCardRef}
              users={userInfo}
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
              users={userInfo}
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
    <div>
      {!Object.keys(liveGamingStreams).length ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Typography variant="h5">
            <Box component="span" color={theme.palette.secondary.main}>
              Live channels{" "}
            </Box>
            we think you’ll like
          </Typography>
          <Grid
            container
            justify="center"
            spacing={3}
            className={classes.streamsDiv}
          >
            {renderGamingStreams()}
          </Grid>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    liveGamingStreams: state.liveGamingStreams,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = {
  fetchLiveGamingStreams,
  fetchUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveGamingStreams);
