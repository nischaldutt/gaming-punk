import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import routes from "../routes";
import createBrowserHistory from "../history";

import { Grid, ThemeProvider } from "@material-ui/core";
import theme from "../themes";

const renderRoutes = () => {
  return routes.map((route) => {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    );
  });
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={createBrowserHistory}>
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>

          <Grid item container>
            <Switch>{renderRoutes()}</Switch>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;
