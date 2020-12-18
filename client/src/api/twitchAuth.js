import axios from "axios";

const twitchAuth = axios.create({
  baseURL: "https://localhost:3001/auth",
});

export default twitchAuth;
