import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../../actions";

import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

const background = "https://i.imgur.com/YuIz3hY.png";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    width: "200px",
    margin: "0 auto",
    fontSize: "1.3rem",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      fontSize: "1rem",
    },
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "2vw",
  },
  emblem: {
    width: "100%",
    borderRadius: "15px",
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
    <Grid container className={classes.container}>
      <Grid item sm={false} lg={3}></Grid>
      <Grid
        className={classes.root}
        item
        container
        alignItems="center"
        direction="column"
        sm={12}
        lg={6}
      >
        <Typography variant="h3" className={classes.text}>
          {loginMessage}
        </Typography>
        <Button className={classes.loginButton} size="large" href={oAuthLink}>
          {loginButtonText}
        </Button>
      </Grid>
      <Grid item sm={false} lg={3}></Grid>
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
