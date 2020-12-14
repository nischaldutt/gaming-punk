const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const request = require("request");
const handlebars = require("handlebars");
const cors = require("cors");

require("dotenv").config();

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL; // You can run locally with - http://localhost:3000/auth/twitch/callback

// Initialize Express and middlewares
const app = express();
app.use(cors());
// app.options("*", cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   if ("OPTIONS" == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);

app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function (accessToken, done) {
  const options = {
    url: "https://api.twitch.tv/helix/users",
    method: "GET",
    headers: {
      "Client-ID": TWITCH_CLIENT_ID,
      Accept: "application/vnd.twitchtv.v5+json",
      Authorization: "Bearer " + accessToken,
    },
  };

  request(options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  "twitch",
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.twitch.tv/oauth2/authorize",
      tokenURL: "https://id.twitch.tv/oauth2/token",
      clientID: TWITCH_CLIENT_ID,
      clientSecret: TWITCH_SECRET,
      callbackURL: CALLBACK_URL,
      state: true,
    },
    function (accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;

      // Securely store user profile in your DB
      //User.findOrCreate(..., function(err, user) {
      //  done(err, user);
      //});

      done(null, profile);
    }
  )
);

// Set route to start OAuth link, this is where you define scopes to request
app.get(
  "/auth/twitch",
  (req, res, next) => {
    console.log(res);
    next();
  },
  passport.authenticate("twitch", { scope: "user_read" })
);

// Set route for OAuth redirect
app.get(
  "/",
  (req, res, next) => {
    console.log("inside");
    next();
  },
  passport.authenticate("twitch", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// // Define a simple template to safely generate HTML with values from user's profile
// const template = handlebars.compile(`
// <html><head><title>Twitch Auth Sample</title></head>
// <table>
//     <tr><th>Access Token</th><td>{{accessToken}}</td></tr>
//     <tr><th>Refresh Token</th><td>{{refreshToken}}</td></tr>
//     <tr><th>Display Name</th><td>{{display_name}}</td></tr>
//     <tr><th>Bio</th><td>{{bio}}</td></tr>
//     <tr><th>Image</th><td>{{logo}}</td></tr>
// </table></html>`);

// // If user has an authenticated session, display it, otherwise display link to authenticate
// app.get("/", function (req, res) {
//   if (req.session && req.session.passport && req.session.passport.user) {
//     res.send(template(req.session.passport.user));
//   } else {
//     res.send(
//       '<html><head><title>Twitch Auth Sample</title></head><a href="/auth/twitch"><img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"></a></html>'
//     );
//   }
// });

app.listen(3001, function () {
  console.log("Twitch auth sample listening on port 3001!");
});
