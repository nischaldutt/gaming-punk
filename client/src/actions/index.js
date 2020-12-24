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
  FETCH_TOP_GAMES,
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

export const fetchTopGames = (accessToken) => async (dispatch, getState) => {
  const response = await twitch.get("/top", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
  });
  console.log(response);
  dispatch({
    type: FETCH_TOP_GAMES,
    payload: response.data.data,
  });
};
