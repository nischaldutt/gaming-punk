import {
  SET_USER_ACCESS_TOKEN,
  FETCH_TOP_GAME_CATEGORIES,
  FETCH_LIVE_GAMING_STREAMS,
  FETCH_USER_INFO,
  FETCH_SELECTED_GAME_STREAMS,
  FETCH_SELECTED_GAME_USERS,
  REFRESH_SELECTED_GAME_STREAMS,
  FETCH_CHANNEL_TEAMS,
} from "../actions/types";

export const twitchOauthReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER_ACCESS_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const topGameCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TOP_GAME_CATEGORIES:
      let prevGameCategories = [];

      if (Object.keys(state).length) {
        prevGameCategories = state.data;
      }

      const combinedResponse = [...prevGameCategories, ...action.payload.data];

      // remove duplicate games from response array using Map
      const myMap = new Map(
        combinedResponse.map((game) => {
          return [game.id, game];
        })
      );

      return {
        data: [...myMap.values()],
        pagination: { cursor: action.payload.pagination.cursor },
      };

    default:
      return state;
  }
};

export const liveGamingStreamsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIVE_GAMING_STREAMS:
      let prevGamingStreams = [];

      if (Object.keys(state).length) {
        prevGamingStreams = state.data;
      }

      const combinedResponse = [...prevGamingStreams, ...action.payload.data];

      // remove duplicate streams from response array using Map
      const myMap = new Map(
        combinedResponse.map((stream) => {
          return [stream.id, stream];
        })
      );

      return {
        data: [...myMap.values()],
        pagination: { cursor: action.payload.pagination.cursor },
      };

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

export const selectedGameStreamsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SELECTED_GAME_STREAMS: {
      let prevGamingStreams = [];

      if (Object.keys(state).length) {
        prevGamingStreams = state.data;
      }
      const combinedResponse = [...prevGamingStreams, ...action.payload.data];

      // remove duplicate streams from response array using Map
      const myMap = new Map(
        combinedResponse.map((stream) => {
          return [stream.id, stream];
        })
      );

      return {
        data: [...myMap.values()],
        pagination: { cursor: action.payload.pagination.cursor },
      };
    }
    case REFRESH_SELECTED_GAME_STREAMS: {
      return {};
    }
    default:
      return state;
  }
};

export const selectedGameUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SELECTED_GAME_USERS: {
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

export const channelTeamsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CHANNEL_TEAMS: {
      let teams = action.payload;
      teams = !teams ? [] : teams;
      return [...teams];
    }
    default:
      return state;
  }
};
