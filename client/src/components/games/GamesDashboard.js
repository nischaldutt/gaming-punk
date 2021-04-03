import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import TwitchLogin from "./TwitchLogin";
import TwitchTabs from "./TwitchTabs";
import CategoryCard from "./CategoryCard";
import { fetchTopGameCategories } from "../../actions";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
  text: {
    flex: 1,
    padding: "20px",
    marginLeft: "20px",
  },
}));

const GamesDashboard = ({
  accessToken,
  fetchTopGameCategories,
  topGameCategories,
}) => {
  const classes = useStyles();
  const lastCardRef = useRef(null);

  useEffect(() => {
    if (accessToken && !Object.keys(topGameCategories).length) {
      fetchTopGameCategories(accessToken);
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const [entity] = entities;
      if (entity.isIntersecting && topGameCategories.pagination.cursor) {
        observer.unobserve(lastCardRef.current);
        fetchTopGameCategories(
          accessToken,
          topGameCategories.pagination.cursor
        );
      }
    }, options);

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }
  }, [accessToken, topGameCategories, fetchTopGameCategories, lastCardRef]);

  const renderSearchCards = () => {
    return topGameCategories.data.map((game, index) => {
      if (topGameCategories.data.length - 1 === index) {
        return (
          <Grid item key={game.id}>
            <CategoryCard
              innerRef={lastCardRef}
              game={game}
              width={170}
              height={226}
            />
          </Grid>
        );
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
    <Grid container justify="center" spacing={0} className={classes.root}>
      {!accessToken ? (
        <TwitchLogin />
      ) : (
        <React.Fragment>
          <Typography variant="h2" className={classes.text}>
            Browse
          </Typography>
          ,
          <TwitchTabs />,{renderSearchCards()}
        </React.Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  accessToken: state.accessToken,
  topGameCategories: state.topGameCategories,
});

const mapDispatchToProps = {
  fetchTopGameCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesDashboard);
