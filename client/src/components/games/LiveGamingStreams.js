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
  const lastCardRef = useRef(null);
  let [streamsFetched, setStreamsFetched] = useState(false);

  // fetching the gaming streams
  useEffect(() => {
    if (!Object.keys(liveGamingStreams).length) {
      fetchLiveGamingStreams(accessToken);
    } else if (
      Object.keys(liveGamingStreams.data).length &&
      !Object.keys(userInfo).length
    ) {
      const userIds = liveGamingStreams.data.map((stream) => stream.user_id);
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
    if (accessToken && !Object.keys(liveGamingStreams).length) {
      fetchLiveGamingStreams(accessToken);
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const [entity] = entities;
      if (entity.isIntersecting && liveGamingStreams.pagination.cursor) {
        observer.unobserve(lastCardRef.current);
        fetchLiveGamingStreams(
          accessToken,
          liveGamingStreams.pagination.cursor
        );
        setStreamsFetched(true);
      }
    }, options);

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }
  }, [accessToken, liveGamingStreams, fetchLiveGamingStreams]);

  useEffect(() => {
    if (accessToken && Object.keys(liveGamingStreams).length) {
      if (streamsFetched) {
        const userIds = liveGamingStreams.data
          .slice(-20)
          .map((stream) => stream.user_id);
        const usersToFetch = userIds.join().replace(/,/g, "&id=");
        fetchUserInfo(accessToken, usersToFetch);
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
