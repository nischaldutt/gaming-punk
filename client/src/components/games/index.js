import React from "react";
import { connect } from "react-redux";
import TwitchDashboard from "./TwitchDashboard";
import TwitchLogin from "./TwitchLogin";
import { setAccessToken } from "../../actions";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    height: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
}));

const Games = ({ accessToken, ...props }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      {!accessToken ? (
        <Grid item container xs={12} className={classes.root}>
          <TwitchLogin />
        </Grid>
      ) : (
        <Grid item container xs={12} className={classes.root}>
          <TwitchDashboard />
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { accessToken: state.accessToken };
};

export default connect(mapStateToProps, { setAccessToken })(Games);
