import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backGroundColor: theme.palette.primary.light,
  },
  grow: {
    height: 70,
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(6),
  },
  iconHeader: {
    transition: "transform .2s",
    color: `${theme.palette.secondary.main}`,
    fontSize: 30,
    "&:hover": {
      transform: "scale(1.5)",
    },
  },
  headerItems: {
    marginRight: theme.spacing(4),
    fontWeight: "bold",
    color: `${theme.palette.text.primary}`,
    display: "block",
    "&:hover": {
      color: `${theme.palette.text.secondary}`,
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ backgroundColor: `${theme.palette.primary.light}` }}
      >
        <Toolbar className={classes.appBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <Link to="/">
              <LiveTvIcon className={classes.iconHeader} />
            </Link>
          </IconButton>

          <Link to="/games">
            <Typography className={classes.headerItems} variant="h5" noWrap>
              Browse
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
