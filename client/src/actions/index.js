import streams from "../api/streams";
import twitch from "../api/twitch";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  SET_USER_ACCESS_TOKEN,
  FETCH_TOP_GAME_CATEGORIES,
  FETCH_LIVE_GAMING_STREAMS,
  FETCH_USER_INFO,
} from "./types";
import createBrowserHistory from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });
  // programmatic navigation after the form returns success/error
  createBrowserHistory.push("/streams");
};

export const fetchStreams = () => async (dispatch, getState) => {
  const response = await streams.get("/streams");
  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = (id) => async (dispatch, getState) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues) => async (dispatch, getState) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });
  createBrowserHistory.push("/streams");
};

export const deleteStream = (id) => async (dispatch, getState) => {
  await streams.delete(`streams/${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });
  createBrowserHistory.push("/streams");
};

export const setAccessToken = (access_token) => {
  return {
    type: SET_USER_ACCESS_TOKEN,
    payload: access_token,
  };
};

export const fetchTopGameCategories = (accessToken) => async (
  dispatch,
  getState
) => {
  const response = await twitch.get("/games/top", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
  });
  dispatch({
    type: FETCH_TOP_GAME_CATEGORIES,
    payload: response.data.data,
  });
};

export const fetchLiveGamingStreams = (accessToken) => async (
  dispatch,
  getState
) => {
  const response = await twitch.get("/streams", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
  });
  dispatch({
    type: FETCH_LIVE_GAMING_STREAMS,
    payload: response.data.data,
  });
};

export const fetchUserInfo = (accessToken, userIds) => async (
  dispatch,
  getState
) => {
  const response = await twitch.get(`/users?id=${userIds}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
  });
  dispatch({
    type: FETCH_USER_INFO,
    payload: response.data.data,
  });
};
