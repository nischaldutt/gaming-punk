import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopGames } from "../../actions";

import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fluidContainer: {
    border: "1px solid white",
  },
  sectionContainer: {},
  gameCardsContainer: {
    display: "grid",
    gap: "5px 5px",
    border: "1px solid red",
    width: "100%",
    placeContent: "center",
    gridTemplateColumns: "repeat(10, 1fr)",
  },
  gameCard: {
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
    cursor: "pointer",
  },
  purpleText: {
    color: theme.palette.text.secondary,
  },
  containerHeader: {
    width: "100%",
  },
}));

export const TwitchStreams = ({ accessToken, fetchTopGames, topGames }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchTopGames(accessToken);
  }, [accessToken, fetchTopGames]);

  const renderGameCard = () => {
    return topGames.map((game) => {
      const url = game.box_art_url.replace(/{width}x{height}/g, "170x260");
      return (
        <div key={game.id} className={classes.gameCard}>
          <img className={classes.cardImage} src={url} alt={game.name} />
          <Typography variant="subtitle1">{game.name}</Typography>
        </div>
      );
    });
  };

  const renderTopGames = () => {
    if (topGames.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className={classes.sectionContainer}>
        <Typography variant="h5" className={classes.containerHeader}>
          <span className={classes.purpleText}>Categories </span>
          we think you'll like
        </Typography>
        <div className={classes.gameCardsContainer}>{renderGameCard()}</div>
      </div>
    );
  };

  return (
    <Grid container direction="column" className={classes.fluidContainer}>
      <Grid container item>
        {renderTopGames()}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.accessToken,
    topGames: state.topGames,
  };
};

const mapDispatchToProps = {
  fetchTopGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitchStreams);

// rfcredux and rafce for code snippets
