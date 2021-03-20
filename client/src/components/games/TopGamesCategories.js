import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopGameCategories } from "../../actions";
import CategoryCard from "./CategoryCard";
import Loading from "../Loading";

import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid green",
  },
  categoriesDiv: {
    paddingTop: "10px",
  },
}));

const TopGamesCategories = ({
  accessToken,
  topGameCategories,
  fetchTopGameCategories,
}) => {
  const classes = useStyles();

  // fetching top games
  useEffect(() => {
    if (!topGameCategories.length) {
      fetchTopGameCategories(accessToken);
    }
  }, [accessToken, topGameCategories, fetchTopGameCategories]);

  const renderTopGameCategories = () => {
    return topGameCategories.map((game) => {
      return (
        <Grid item key={game.id}>
          <CategoryCard game={game} />
        </Grid>
      );
    });
  };

  return (
    <div>
      {!topGameCategories.length ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Typography variant="h5">Categories we think you'll like</Typography>
          <Grid
            container
            justify="center"
            spacing={3}
            className={classes.categoriesDiv}
          >
            {renderTopGameCategories()}
          </Grid>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.accessToken,
    topGameCategories: state.topGameCategories,
  };
};

const mapDispatchToProps = {
  fetchTopGameCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopGamesCategories);
