import {
  SET_USER_ACCESS_TOKEN,
  FETCH_TOP_GAME_CATEGORIES,
  FETCH_LIVE_GAMING_STREAMS,
  FETCH_USER_INFO,
} from "../actions/types";

export const twitchOauthReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER_ACCESS_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const topGameCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_GAME_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export const liveGamingStreamsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_LIVE_GAMING_STREAMS:
      return action.payload;
    default:
      return state;
  }
};

export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_INFO: {
      action.payload.map((user) => {
        state[user.id] = user;
        return user;
      });
      return { ...state };
    }
    default:
      return state;
  }
};
