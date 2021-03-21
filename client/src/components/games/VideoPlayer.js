import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";

import ReactPlayer from "react-player";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    height: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
  twitchEmbed: {
    width: "100%",
    height: "calc(100vh - 70px)",
  },
}));
const VideoPlayer = ({ location: { streamInfo: stream }, pathname }) => {
  const classes = useStyles();
  const [channel, setChannel] = useState(stream ? stream.user_login : null);

  useEffect(() => {
    if (channel === null) {
      console.log("path without store");
      setChannel(window.location.pathname.split("/")[2]);
    }
  }, [channel]);

  return (
    <Grid container className={classes.root}>
      {!channel ? (
        <Loading />
      ) : (
        <Grid container className={classes.twitchEmbed}>
          <Grid item xs={9}>
            <ReactPlayer
              url={`https://www.twitch.tv/${channel}`}
              playing
              controls
              width="100%"
              height="100%"
            />
          </Grid>
          <Grid item xs={3}>
            <iframe
              title={channel}
              src={`https://www.twitch.tv/embed/${channel}/chat?darkpopout&parent=localhost`}
              height="100%"
              width="100%"
            ></iframe>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
