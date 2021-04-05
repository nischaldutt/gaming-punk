import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopGameCategories } from "../../actions";
import CategoryCard from "./CategoryCard";
import Loading from "../Loading";

import { Box, Typography, Grid, makeStyles } from "@material-ui/core";
import theme from "../../themes";

const useStyles = makeStyles((theme) => ({
  root: {},
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

  useEffect(() => {
    if (!Object.keys(topGameCategories).length) {
      // fetch top games in the initial render
      fetchTopGameCategories(accessToken);
    }
  }, [accessToken, topGameCategories, fetchTopGameCategories]);

  const renderTopGameCategories = () => {
    // render only first 20 game cards in the home page
    return topGameCategories.data.map((game, index) => {
      if (index > 20) {
        return null;
      } else {
        return (
          <Grid item key={game.id}>
            <CategoryCard game={game} width={170} height={226} />
          </Grid>
        );
      }
    });
  };

  return (
    <div>
      {!Object.keys(topGameCategories).length ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Typography variant="h5">
            <Box component="span" color={theme.palette.secondary.main}>
              Categories{" "}
            </Box>
            we think you'll like
          </Typography>
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
