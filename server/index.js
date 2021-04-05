const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const fetch = require("node-fetch");
const request = require("request");
const handlebars = require("handlebars");
const axios = require("axios");
const got = require("got");
const cors = require("cors");

require("dotenv").config();

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_APP_PROXY);
  next();
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
    rolling: true,
  })
);
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send({
    status: 200,
    result: "recieved",
  });
});

app.get("/auth/twitch/callback", (req, res, next) => {
  console.log("endpoint hit");
  console.log(req.query);
  const { code } = req.query;

  got({
    url: "https://id.twitch.tv/oauth2/token",
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    form: {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: CALLBACK_URL,
    },
    responseType: "json",
  }).then((resp) => {
    console.log("got the token");
    console.log(resp.body);
    res.redirect(
      `${process.env.REACT_APP_PROXY}/?access_token=${resp.body.access_token}`
    );
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server live at port 3001.");
});
// "start": "node index.js && json-server -p 3001 -w db.json
