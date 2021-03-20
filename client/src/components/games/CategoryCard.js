import React from "react";
import { connect } from "react-redux";

import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 140,
    height: 212,
    backgroundColor: theme.palette.primary.main,
  },
  gameTitle: {
    fontWeight: 600,
  },
  secondaryText: {
    color: "#8e8e8e",
  },
}));

const CategoryCard = ({ game }) => {
  const classes = useStyles();
  const url = game.box_art_url.replace(/{width}x{height}/g, "140x192");

  return (
    <div elevation={3} className={classes.root}>
      <img src={url} alt={game.name} />
      <Typography
        className={classes.gameTitle}
        noWrap
        gutterBottom
        variant="body1"
      >
        {game.name}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
