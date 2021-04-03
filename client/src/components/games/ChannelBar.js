import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Avatar,
  Container,
  Grid,
  Modal,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    dispatch: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "50px",
    height: "calc(100vh - 70px)",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    position: "sticky",
    top: 0,
    overflow: "hidden",
  },
  user: {
    marginTop: "15px",
    cursor: "pointer",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  userProfileImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  userName: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  description: {
    marginTop: "10px",
  },
  button: {
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
}));

const ChannelBar = ({ userInfo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState({});

  const renderModalBody = (user) => {
    const buttonText = "View Live Stream Now";

    return (
      <Container className={classes.paper}>
        <Grid container>
          <Grid item>
            <img
              alt={user.display_name}
              className={classes.userProfileImage}
              src={user.offline_image_url}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.userName}
              id="simple-modal-title"
              variant="h4"
            >
              {user.display_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.description}
              id="simple-modal-description"
              variant="h6"
            >
              {user.description}
            </Typography>
          </Grid>
          <Grid
            className={classes.description}
            item
            container
            xs={12}
            justify="center"
          >
            <Link
              to={{
                pathname: `/game/${user.login}`,
                user,
              }}
            >
              <Button className={classes.button} size="large">
                {buttonText}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  };

  const handleOpen = (userId) => {
    setOpen({ ...open, [userId]: true });
  };

  const handleClose = (userId) => {
    setOpen({ ...open, [userId]: false });
  };

  const renderUsers = () => {
    return Object.keys(userInfo).map((userId) => {
      const user = userInfo[userId];

      if (open[userId] === undefined) {
        open[userId] = false;
      }

      return (
        <React.Fragment key={user.id}>
          <Grid
            item
            onClick={() => handleOpen(userId)}
            className={classes.user}
          >
            <Avatar alt={user.display_name} src={user.profile_image_url} />
          </Grid>

          <Modal
            open={open[userId]}
            onClose={() => handleClose(userId)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {renderModalBody(user)}
          </Modal>
        </React.Fragment>
      );
    });
  };

  return (
    <Grid container direction="column" className={classes.root}>
      {!Object.keys(userInfo).length ? null : renderUsers()}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelBar);
