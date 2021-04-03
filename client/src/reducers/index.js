import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import {
  twitchOauthReducer,
  topGameCategoriesReducer,
  liveGamingStreamsReducer,
  userInfoReducer,
  selectedGameStreamsReducer,
  selectedGameUsersReducer,
  channelTeamsReducer,
} from "./twitchReducers";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
  clientId: () => process.env.REACT_APP_TWITCH_CLIENT_ID,
  accessToken: twitchOauthReducer,
  topGameCategories: topGameCategoriesReducer,
  liveGamingStreams: liveGamingStreamsReducer,
  channelTeams: channelTeamsReducer,
  userInfo: userInfoReducer,
  selectedGameStreams: selectedGameStreamsReducer,
  selectedGameUsers: selectedGameUsersReducer,
});
