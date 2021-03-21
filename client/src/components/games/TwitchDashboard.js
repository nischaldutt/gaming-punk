import React from "react";
import { connect } from "react-redux";
import TopGamesCategories from "./TopGamesCategories";
import LiveGamingStreams from "./LiveGamingStreams";
import Loading from "../Loading";

import ReactPlayer from "react-player";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  root: {
    overflowY: "scroll",
    border: "2px solid red",
    color: theme.palette.text.primary,
    width: "calc(100% - 60px)",
  },
  channelBar: {
    width: "60px",
    height: "calc(100vh - 70px)",
    border: "2px solid green",
    backgroundColor: theme.palette.primary.light,
    position: "sticky",
    top: 0,
  },
  dashboard: {
    padding: "20px",
    border: "2px solid blue",
  },
  dashboardDiv: {
    border: "2px solid white",
    padding: "10px",
  },
}));

const TwitchDashboard = ({ liveGamingStreams }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* Vertical Channel Bar */}
      <Grid container direction="column" className={classes.channelBar}>
        <Grid item>1</Grid>
        <Grid item>2</Grid>
        <Grid item>3</Grid>
      </Grid>

      {/* Dashboard */}
      <Grid container className={classes.root} spacing={0}>
        <Grid container item direction="column" className={classes.dashboard}>
          <Grid
            item
            container
            justify="center"
            className={classes.dashboardDiv}
          >
            {liveGamingStreams.length ? (
              <ReactPlayer
                url={`https://www.twitch.tv/${liveGamingStreams[0].user_login}`}
                className={classes.reactPlayer}
                playing
                muted
                controls
                width="80%"
                height={275}
              />
            ) : (
              <Loading />
            )}
          </Grid>
          <Grid item container className={classes.dashboardDiv}>
            <LiveGamingStreams />
          </Grid>
          <Grid item container className={classes.dashboardDiv}>
            <TopGamesCategories />
          </Grid>
        </Grid>
      </Grid>
    </div>
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
