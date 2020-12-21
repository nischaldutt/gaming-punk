import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import { twitchOauthReducer, twitchStreamsReducer } from "./twitchReducers";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
  clientId: () => process.env.REACT_APP_TWITCH_CLIENT_ID,
  accessToken: twitchOauthReducer,
  topGames: twitchStreamsReducer,
});
