import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
import "./Thumbnail.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 288,
    height: 269,
    backgroundColor: theme.palette.primary.main,
    padding: "10px",
  },
  streamTitle: {
    fontWeight: 600,
  },
  secondaryText: {
    color: "#8e8e8e",
  },
}));

const VideoCard = ({ stream, users, innerRef, width, height }) => {
  const classes = useStyles();
  const streamThumbnailUrl = stream.thumbnail_url.replace(
    /{width}x{height}/g,
    `${width}x${height}`
  );

  return (
    <Link
      to={{
        pathname: `/game/${stream.user_login}`,
        stream,
      }}
    >
      {/* if innerRef is provided it will point to the last card */}
      <Card ref={innerRef} className={`${classes.root} fade-in`}>
        <CardActionArea>
          <CardMedia
            className="fade-in"
            component="img"
            alt={stream.title}
            image={streamThumbnailUrl}
            title={stream.title}
          />
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                {!Object.keys(users).length || !users[stream.user_id]
                  ? ({
                      /* if users object in store is empty
                OR if user with provided stream does not exists in the store 
                then render default avatar*/
                    },
                    (<Avatar />))
                  : ({
                      /* else render the user's fetched avatar */
                    },
                    (
                      <Avatar
                        alt={stream.user_name}
                        src={users[stream.user_id].profile_image_url}
                      />
                    ))}
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
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
