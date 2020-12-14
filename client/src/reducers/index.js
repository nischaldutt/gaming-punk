import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import twitchReducer from "./twitchReducers";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
  topGames: twitchReducer,
});
