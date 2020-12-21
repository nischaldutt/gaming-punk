import { SET_USER_ACCESS_TOKEN, FETCH_TOP_GAMES } from "../actions/types";

export const twitchOauthReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER_ACCESS_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const twitchStreamsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_GAMES:
      return [action.payload];
    default:
      return state;
  }
};
