import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Typography, makeStyles } from "@material-ui/core";
import "./Thumbnail.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 180,
    height: 250,
    backgroundColor: theme.palette.primary.main,
    marginBottom: "5px",
  },
  gameTitle: {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  secondaryText: {
    color: "#8e8e8e",
  },
}));

const CategoryCard = ({ game, innerRef, width, height }) => {
  const classes = useStyles();
  const gameName = game.name.toLowerCase().split(" ").join("_");
  const thumbnailUrl = game.box_art_url.replace(
    /{width}x{height}/g,
    `${width}x${height}`
  );

  return (
    <Link to={{ pathname: `/games/${gameName}`, game }}>
      {/* if innerRef is provided it will point to the last card */}
      <div ref={innerRef} className={classes.root}>
        <img
          className={`${classes.gameImage} fade-in`}
          src={thumbnailUrl}
          alt={game.name}
        />
        <Typography
          className={classes.gameTitle}
          noWrap
          gutterBottom
          variant="body1"
        >
          {game.name}
        </Typography>
      </div>
    </Link>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
