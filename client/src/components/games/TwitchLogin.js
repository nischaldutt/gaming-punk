import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../../actions";

import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    width: "150px",
    margin: "0 auto",
    border: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up("sm")]: {
      width: "200px",
    },
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "2vw",
  },
}));

const TwitchLogin = ({ accessToken, setAccessToken }) => {
  const classes = useStyles();
  const {
    location: { search: searchQuery },
  } = useHistory();

  const loginButtonText = "Login to Twitch";
  const loginMessage =
    "Aww snap... You need to login to Twitch to view this site.";
  const oAuthLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&response_type=code&scope=user_read`;

  useEffect(() => {
    const urlParams = new URLSearchParams(searchQuery);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, [searchQuery, setAccessToken]);

  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid className={classes.root} item container direction="column" xs={6}>
        <Typography variant="h4" className={classes.text}>
          {loginMessage}
        </Typography>
        <Button className={classes.loginButton} size="large" href={oAuthLink}>
          {loginButtonText}
        </Button>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  accessToken: state.accessToken,
});

const mapDispatchToProps = {
  setAccessToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitchLogin);
