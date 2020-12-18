const express = require("express");
const esess = require("express-session");
const axios = require("axios");
const cors = require("cors");

const crypto = require("crypto");
const got = require("got");

require("dotenv").config();

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

const app = express();
const http = require("http").Server(app);
http.listen(3001, function () {
  console.log("Server raised on", 3001);
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Setup a session manager
var session = esess({
  secret: crypto.randomBytes(4).toString("base64"),
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 30 * 60 * 1000,
  },
  rolling: true,
});
app.use(session);

app
  .route("/")
  .get((req, res) => {
    console.log("Incoming get request");

    if (req.session.token) {
      // probably logged in
      // and will suffice for this example

      // validate and return the token details
      got({
        url: "https://id.twitch.tv/oauth2/validate",
        headers: {
          Authorization: "OAuth " + req.session.token.access_token,
        },
        responseType: "json",
      })
        .then((resp) => {
          console.log("Ok", resp.body);
          console.log({
            user: req.session.user,
            token: resp.body,
          });

          // res.render("loggedin", {
          //   user: req.session.user,
          //   token: resp.body,
          // });
        })
        .catch((err) => {
          console.error("Error body:", err.response.body);
          // the oAuth dance failed
          req.session.error =
            "An Error occured: " +
            (err.response && err.response.body.message
              ? err.response.body.message
              : "Unknown");
          res.redirect("/");
        });

      return;
    }

    // test for query string parameters
    let { code, error, error_description, scope, state } = req.query;

    if (code) {
      // do the oAuth dance and exchange the token for a user token

      // first validate the state is valid
      state = decodeURIComponent(state);

      if (req.session.state != state) {
        req.session.error = "State does not match. Please try again!";
        res.redirect("/");
        return;
      }
      // done with the state params
      delete req.session.state;

      // start the oAuth dance
      got({
        url: "https://id.twitch.tv/oauth2/token",
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        form: {
          client_id: TWITCH_CLIENT_ID,
          client_secret: TWITCH_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: CALLBACK_URL,
        },
        responseType: "json",
      })
        .then((resp) => {
          // oAuth dance success!
          req.session.token = resp.body;

          // we'll go collect the user this token is for
          return got({
            url: "https://api.twitch.tv/helix/users",
            method: "GET",
            headers: {
              Accept: "application/json",
              "Client-ID": TWITCH_CLIENT_ID,
              Authorization: "Bearer " + req.session.token.access_token,
            },
            responseType: "json",
          });
        })
        .then((resp) => {
          if (resp.body && resp.body.data && resp.body.data[0]) {
            req.session.user = resp.body.data[0];
          } else {
            req.session.warning =
              "We got a Token but failed to get your Twitch profile from Helix";
          }
          res.redirect("/");
        })
        .catch((err) => {
          console.error("Error body:", err.response.body);
          // the oAuth dance failed
          req.session.error =
            "An Error occured: " +
            (err.response && err.response.body.message
              ? err.response.body.message
              : "Unknown");
          res.redirect("/");
        });

      return;
    }

    var auth_error = "";
    if (error) {
      auth_error = "oAuth Error " + error_description;
    }

    // We use state to defend against CSRF attacks.
    // We'll generate one and store it in the session
    // twitch will return it to us later
    req.session.state = crypto.randomBytes(16).toString("base64");

    // this just passes a bunch of vairables to the view
    // and the view handles the display logic
    // it's a non exhaustive list of scopes tha exist

    // how scopes are being fetched here is _bad_ but will suffice for this example

    // got({
    //   url: `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_SECRET}&response_type=code&scope=user:read:email`,
    //   method: "GET",
    // })
    //   .then((res) => {
    //     console.log("************************");
    //     res.redirect(res.request.redirects[0]);
    //   })
    //   .catch((err) => {
    //     console.log("++++++++++++++++++++");
    //     console.log(err);
    //   });
    // res.render("generator", {
    //   client_id: TWITCH_CLIENT_ID,
    //   redirect_uri: TWITCH_SECRET,
    //   auth_error,
    //   scopes: "user:read:email",
    //   state: req.session.state,
    // });
  })
  .post((req, res) => {
    console.log("Incoming post request");
    res.redirect("/");
  });

app.route("auth/twitch/callback").get((req, res, next) => {
  console.log("here");
  got({
    url: `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_SECRET}&response_type=code&scope=user:read:email`,
    method: "GET",
  })
    .then((data) => {
      console.log("************************");
      res.redirect(data.request.redirects[0]);
    })
    .catch((err) => {
      console.log("++++++++++++++++++++");
      console.log(err);
    });
});
// app.route("/logout/").get((req, res) => {
//   console.log("Incoming logout request");
//   // as well as dumoing the session lets revoke the token
//   got({
//     url:
//       "https://id.twitch.tv/oauth2/revoke" +
//       "?client_id=" +
//       config.client_id +
//       "&token=" +
//       req.session.token.access_token,
//     method: "post",
//   })
//     .then((resp) => {
//       console.log("KeyRevoke OK", resp.body);
//     })
//     .catch((err) => {
//       console.error("KeyRevoke Fail", err);
//     });

//   // and dump
//   req.session.destroy();
//   res.redirect("/");
// });
