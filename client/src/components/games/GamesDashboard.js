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
  // declare ref variable that references the last stream card visible in the viewport
  // while in infinite scroll
  const lastCardRef = useRef(null);

  useEffect(() => {
    if (accessToken && !Object.keys(topGameCategories).length) {
      // fetch the top games in the initial render
      fetchTopGameCategories(accessToken);
    }

    // "Intersection Observer" used for infinite scroll
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const [entity] = entities;
      if (entity.isIntersecting && topGameCategories.pagination.cursor) {
        // if last card if in the viewport and we have cursor to fetch next results

        // first remove currently observed last card reference so as to avoid calling
        // with same cursor repeatedly
        observer.unobserve(lastCardRef.current);
        // fetch the next results
        fetchTopGameCategories(
          accessToken,
          topGameCategories.pagination.cursor
        );
      }
    }, options);

    if (lastCardRef.current) {
      // if the last card has been rendered but is not on the viewport yet,
      // start observing the card
      observer.observe(lastCardRef.current);
    }
  }, [accessToken, topGameCategories, fetchTopGameCategories, lastCardRef]);

  const renderSearchCards = () => {
    return topGameCategories.data.map((game, index) => {
      if (topGameCategories.data.length - 1 === index) {
        // if the card is last in games list then set ref in it
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
        // else no need to set ref
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
