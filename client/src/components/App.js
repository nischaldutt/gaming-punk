import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import Games from "./games";
import VideoPlayer from "./games/VideoPlayer";
import createBrowserHistory from "../history";

import { ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import theme from "../themes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={createBrowserHistory}>
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>

          <Grid item container>
            <Switch>
              <Route path="/" exact component={Games} />
              <Route pah="/game/:user_login" exact component={VideoPlayer} />
              <Route path="/streams" exact component={StreamList} />
              <Route path="/streams/new" exact component={StreamCreate} />
              <Route path="/streams/edit/:id" exact component={StreamEdit} />
              <Route
                path="/streams/delete/:id"
                exact
                component={StreamDelete}
              />
              <Route path="/streams/:id" exact component={StreamShow} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;
