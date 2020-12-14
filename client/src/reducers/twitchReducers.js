import { FETCH_TOP_GAMES } from "../actions/types";

const twitchReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_GAMES:
      return [action.payload];
    default:
      return state;
  }
};

export default twitchReducer;
