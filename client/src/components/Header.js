import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import { useTheme } from "@material-ui/core/styles";
import { fade, makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
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
  menubutton: {
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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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
            className={classes.menubutton}
            color="inherit"
          >
            <Link to="/">
              <LiveTvIcon className={classes.iconHeader} />
            </Link>
          </IconButton>

          <Link to="/">
            <Typography className={classes.headerItems} variant="h5" noWrap>
              Browse
            </Typography>
          </Link>
          <Link to="/">
            {" "}
            <Typography className={classes.headerItems} variant="h5" noWrap>
              Esports
            </Typography>
          </Link>
          <Link to="/">
            {" "}
            <Typography className={classes.headerItems} variant="h5" noWrap>
              Music
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

// const Header = () => {
//   return (
//     <div className="ui secondary pointing menu">
//       <Link to="/" className="item">
//         Twitch.tv
//       </Link>
//       <div className="right menu">
//         <Link to="/streams" className="item">
//           All Streams
//         </Link>
//         <GoogleAuth />
//       </div>
//     </div>
//   );
// };

export default Header;
