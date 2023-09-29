<div>
  <h1 align="center">
    <a href="https://gaming-punk.netlify.app/">Gaming Punk 🎮</a>
  </h1>
  <strong>
    Watch top live gaming streams happening around the world. 
  </strong>
  <p>
    This web application is developed using <a href="https://dev.twitch.tv/docs/api/">Twitch API</a> that provides tools for developing integrations with Twitch.
  </p>
</div>

<hr />

[![Netlify Status](https://api.netlify.com/api/v1/badges/bcc24904-4915-4a0c-a91d-4dd234f61b51/deploy-status)](https://app.netlify.com/sites/gaming-punk/deploys)

## Features

- 🎮 Watch live streams from top gaming streamers around the world.
- 💻 Twitch video player embedded using [React Player](https://github.com/CookPete/react-player).
- 💬 [Twitch live chat](https://dev.twitch.tv/docs/embed/chat) embedded.
- 🔑 Authorization code flow implemented on the server with Express to authorize Twitch users using access token.
- 📱 Fully Responsive application.

## Video Walk-Through

<div>
  <a href="https://youtu.be/sL7DJK9GA74" target="_blank">
    <img
      alt="Gaming Punk"
      src="https://i.imgur.com/co4dANA.png"
    />
  </a>
</div>

## ScreenShots

<div>
    <img
      alt="Gaming Punk Login page"
      src="https://i.imgur.com/2enTsPE.png"
    />
  <hr />
    <img
      alt="Gaming Punk Home page"
      src="https://i.imgur.com/CD4Uexj.png"
    />
  <hr />
    <img
      alt="Gaming Punk modal"
      src="https://i.imgur.com/fTHUOkw.png"
    />
  <hr />
    <img
      alt="Gaming Punk games dashboard"
      src="https://i.imgur.com/NhucFuj.png"
    />
  <hr />
    <img
      alt="Gaming Punk stream dashboard"
      src="https://i.imgur.com/yJqqeEH.png"
    />
  <hr />
    <img
      alt="Gaming Punk video player"
      src="https://i.imgur.com/dKTUCNE.png"
    />
</div>

## Stack Used

### Frontend

- UI framework used: [React.js](https://reactjs.org/)
- State management library used: [React-Redux](https://react-redux.js.org/)
- Component design: [Material UI](https://material-ui.com/)

### Backend

- Server: [Express.js](https://expressjs.com/)

## Hosting

### Frontend

- [Netlify](https://www.netlify.com/)

### Server

- [Heroku](https://www.heroku.com/)

## State

You can have a look at the state of the application by installing [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
