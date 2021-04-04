import axios from "axios";

const streams = axios.create({
  baseURL: process.env.REACT_APP_PROXY,
});

export default streams;
