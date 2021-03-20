import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchLiveGamingStreams, fetchUserInfo } from "../../actions";
import VideoCard from "./VideoCard";
import Loading from "../Loading";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid green",
  },
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

  // fetching the gaming streams
  useEffect(() => {
    if (!liveGamingStreams.length) {
      fetchLiveGamingStreams(accessToken);
    } else {
      const userIds = liveGamingStreams.map((stream) => stream.user_id);
      const usersToFetch = userIds.join().replace(/,/g, "&id=");
      fetchUserInfo(accessToken, usersToFetch);
    }
  }, [liveGamingStreams, accessToken, fetchLiveGamingStreams, fetchUserInfo]);

  const renderGamingStreams = () => {
    return liveGamingStreams.map((stream) => {
      return (
        <Grid item key={stream.id}>
          <VideoCard stream={stream} />
        </Grid>
      );
    });
  };

  return (
    <div>
      {!liveGamingStreams.length ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Typography variant="h5">
            Live channels we think you’ll like
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
