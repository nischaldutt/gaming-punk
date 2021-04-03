import React from "react";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const tabs = ["Games", "Podcasts", "Music", "Esports"];

const tabImages = [
  "https://static.twitchcdn.net/assets/gaming-e9019587744b56b11b43.svg",
  "https://static.twitchcdn.net/assets/irl-baa32e8e64a6974282c0.svg",
  "https://static.twitchcdn.net/assets/music-5fb4595a30d04d991e24.svg",
  "https://static.twitchcdn.net/assets/esports-7a078acca57531d11e29.svg",
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    padding: "25px",
    [theme.breakpoints.up("lg")]: {
      flexWrap: "nowrap",
    },
  },
  tab: {
    margin: "10px",
    height: "50px",
    borderRadius: "8px",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "space-between",
  },
  tabText: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  tabImages: {
    width: "70px",
    height: "70px",
    position: "relative",
    top: "-10px",
    [theme.breakpoints.down("sm")]: {
      width: "50px",
      height: "50px",
    },
  },
}));

const TwitchTabs = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify="space-around"
      alignItems="center"
      spacing={2}
    >
      {tabs.map((tab, index) => {
        return (
          <Grid key={tabs[index]} item xs={12} lg={3} className={classes.tab}>
            <Typography variant="h4" className={classes.tabText}>
              {tab}
            </Typography>
            <img
              className={classes.tabImages}
              alt="tab svg"
              src={tabImages[index]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TwitchTabs;
