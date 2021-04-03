import React from "react";
import { connect } from "react-redux";
import TopGamesCategories from "./TopGamesCategories";
import LiveGamingStreams from "./LiveGamingStreams";
import ChannelBar from "./ChannelBar";
import TwitchTabs from "./TwitchTabs";
import Loading from "../Loading";

import ReactPlayer from "react-player";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  channelBar: {
    width: "auto",
  },
  root: {
    overflowY: "scroll",
    color: theme.palette.text.primary,
    width: "calc(100% - 60px)",
  },
  dashboard: {
    padding: "20px",
  },
  dashboardDiv: {
    padding: "10px",
  },
}));

const TwitchDashboard = ({ liveGamingStreams }) => {
  const classes = useStyles();

  return (
    <Grid container>
      {/* Vertical Channel Bar */}
      <Grid item container className={classes.channelBar}>
        <ChannelBar />
      </Grid>

      {/* Dashboard */}
      <Grid item container className={classes.root} spacing={0}>
        <Grid container item direction="column" className={classes.dashboard}>
          <Grid
            item
            container
            justify="center"
            className={classes.dashboardDiv}
          >
            {Object.keys(liveGamingStreams).length ? (
              <ReactPlayer
                url={`https://www.twitch.tv/${liveGamingStreams.data[0].user_login}`}
                className={classes.reactPlayer}
                playing
                volume={0.8}
                controls
                width="80%"
                height={500}
              />
            ) : (
              <Loading />
            )}
          </Grid>
          <Grid item container>
            <TwitchTabs />
          </Grid>
          <Grid item container className={classes.dashboardDiv}>
            <TopGamesCategories />
          </Grid>
          <Grid item container className={classes.dashboardDiv}>
            <LiveGamingStreams />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    liveGamingStreams: state.liveGamingStreams,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TwitchDashboard);
// rfcredux and rafce for code snippets
