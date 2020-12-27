import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Loading from ".././Loading";
import { fetchTopGames, fetchGamingStreams } from "../../actions";

import {
  Typography,
  Grid,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  fluidContainer: {
    border: "1px solid white",
    overflowY: "scroll",
    display: "grid",
    justifyItems: "center",
  },
  streamsSectionContainer: {
    border: "1px solid green",
    width: "100%",
    display: "grid",
    gap: "5px 5px",
    placeContent: "center",
    gridTemplateColumns: "repeat(5, 1fr)",
  },
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

export const TwitchStreams = ({
  accessToken,
  fetchTopGames,
  topGames,
  fetchGamingStreams,
  gamingStreams,
}) => {
  const classes = useStyles();
  const [gameIds, setGameIds] = useState(null);

  useEffect(() => {
    if (!topGames.length) {
      fetchTopGames(accessToken);
    }
  }, [accessToken, topGames, fetchTopGames]);

  useEffect(() => {
    if (topGames.length && !gamingStreams.length) {
      const gameIdsArray = topGames.map((game) => game.id);
      setGameIds(gameIdsArray.join().replace(/,/g, "&game_id="));
    }
  }, [topGames, gamingStreams]);

  useEffect(() => {
    if (gameIds && !gamingStreams.length && topGames.length) {
      fetchGamingStreams(accessToken, gameIds);
    }
  }, [gameIds, gamingStreams, topGames, accessToken, fetchGamingStreams]);

  const renderTopGameCards = () => {
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
    if (!topGames.length) {
      return <Loading />;
    }
    return (
      <div>
        <Typography variant="h5" className={classes.containerHeader}>
          <span className={classes.purpleText}>Categories </span>
          we think you'll like
        </Typography>
        <div className={classes.gameCardsContainer}>{renderTopGameCards()}</div>
      </div>
    );
  };

  const renderGamingStreamCards = () => {
    return gamingStreams.map((stream) => {
      const streamThumbnailUrl = stream.thumbnail_url.replace(
        /{width}x{height}/g,
        "170x260"
      );
      return (
        <Card key={stream.id} className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={`${stream.user_name}'s stream`}
              height="140"
              image={streamThumbnailUrl}
              title={stream.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {stream.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {stream.user_name}
                <br></br>
                {stream.game_name}
              </Typography>
            </CardContent>
            <Chip label={stream.tag_ids[0]} />
          </CardActionArea>
        </Card>
      );
    });
  };

  const renderGamingStreams = () => {
    if (!gamingStreams.length) {
      return <Loading />;
    }
    return (
      <div>
        <Typography variant="h5" className={classes.containerHeader}>
          Recommended<span className={classes.purpleText}> Gaming </span>
          streams for you
        </Typography>
        <div className={classes.streamsSectionContainer}>
          {renderGamingStreamCards()}
        </div>
      </div>
    );
  };

  return (
    <Grid container className={classes.fluidContainer}>
      <Grid container item>
        {renderTopGames()}
      </Grid>
      <Grid container item>
        {renderGamingStreams()}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.accessToken,
    topGames: state.topGames,
    gamingStreams: state.gamingStreams,
  };
};

const mapDispatchToProps = {
  fetchTopGames,
  fetchGamingStreams,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitchStreams);

// rfcredux and rafce for code snippets
