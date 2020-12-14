import axios from "axios";

const twitchAuth = axios.create({
  baseURL: "http://localhost:3001/auth",
});

export default twitchAuth;
