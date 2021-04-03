import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";
import TwitchLogin from "./TwitchLogin";

import ReactPlayer from "react-player";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    height: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
  twitchEmbed: {
    width: "100%",
    height: "calc(100vh - 70px)",
  },
  layoutDiv: {
    width: "100%",
  },
  chatEmbed: {
    border: "none",
  },
}));

const VideoPlayer = ({ location: { stream }, pathname, accessToken }) => {
  const classes = useStyles();
  const [channel, setChannel] = useState(stream ? stream.user_login : null);

  useEffect(() => {
    if (channel === null) {
      setChannel(window.location.pathname.split("/")[2]);
    }
  }, [channel]);

  return (
    <Grid container className={classes.root}>
      {!accessToken ? (
        <TwitchLogin />
      ) : !channel ? (
        <Loading />
      ) : (
        <Grid container className={classes.twitchEmbed}>
          <Grid item lg={9} sm={12} className={classes.layoutDiv}>
            <ReactPlayer
              url={`https://www.twitch.tv/${channel}`}
              volume={0.8}
              playing
              controls
              width="100%"
              height="100%"
            />
          </Grid>
          <Grid item lg={3} sm={12} className={classes.layoutDiv}>
            <iframe
              className={classes.chatEmbed}
              title={channel}
              src={`https://www.twitch.tv/embed/${channel}/chat?darkpopout&parent=localhost&parent=gaming-punk.netlify.app`}
              height="100%"
              width="100%"
            ></iframe>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  accessToken: state.accessToken,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
