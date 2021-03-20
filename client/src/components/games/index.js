import React, { useEffect } from "react";
import { connect } from "react-redux";
import TwitchDashboard from "./TwitchDashboard";
import { setAccessToken } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    height: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
  loginView: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    overflowY: "scroll",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "2px solid #8776eb",
    borderRadius: "2px",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.5)",
      color: "#8776eb",
    },
    color: theme.palette.text.primary,
    padding: "1vw",
  },
  text: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(6),
    padding: "1vmax",
    fontSize: "2vw",
    // [theme.breakpoints.down("xs")]: {
    //   display: "none",
    // },
  },
}));

const Games = ({
  history: {
    location: { search: searchQuery },
  },
  setAccessToken,
  accessToken,
}) => {
  const classes = useStyles();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchQuery);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, [searchQuery, setAccessToken]);

  const renderTwitchLoginButton = () => {
    return (
      <React.Fragment>
        <Typography className={classes.text}>
          Aww snap... You need to login to Twitch to view this site.
        </Typography>
        <a
          className={classes.loginButton}
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&response_type=code&scope=user_read`}
        >
          Login to Twitch
        </a>
      </React.Fragment>
    );
  };

  return (
    <Grid className={classes.root}>
      {!accessToken ? (
        <Grid item container xs={12} className={classes.loginView}>
          {renderTwitchLoginButton()}
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
