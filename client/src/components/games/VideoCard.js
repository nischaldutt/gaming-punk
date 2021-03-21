import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserInfo } from "../../actions";

import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 288,
    height: 250,
    backgroundColor: theme.palette.primary.main,
  },
  streamTitle: {
    fontWeight: 600,
  },
  secondaryText: {
    color: "#8e8e8e",
  },
}));

const VideoCard = ({ stream, userInfo }) => {
  const classes = useStyles();
  const streamThumbnailUrl = stream.thumbnail_url.replace(
    /{width}x{height}/g,
    "288x158"
  );

  return (
    <Link
      to={{
        pathname: `/game/${stream.user_login}`,
        streamInfo: stream,
      }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={stream.title}
            image={streamThumbnailUrl}
            title={stream.title}
          />
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                {/* test if userInfo object in store is empty */}
                {userInfo &&
                Object.keys(userInfo).length === 0 &&
                userInfo.constructor === Object ? (
                  <Avatar />
                ) : (
                  <Avatar
                    alt={stream.user_name}
                    src={userInfo[stream.user_id].profile_image_url}
                  />
                )}
              </Grid>

              <Grid item xs={9}>
                <Typography
                  className={classes.streamTitle}
                  noWrap
                  gutterBottom
                  variant="body1"
                >
                  {stream.title}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.secondaryText}
                  component="p"
                >
                  {stream.user_name}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.secondaryText}
                  component="p"
                >
                  {stream.game_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {stream.viewer_count > 999
                    ? `${Math.round(stream.viewer_count / 1000)}K viewers`
                    : `${stream.viewer_count} viewers`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.accessToken,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = {
  fetchUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
