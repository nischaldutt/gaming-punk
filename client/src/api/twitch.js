import axios from "axios";

const twitch = axios.create({
  baseURL: "https://api.twitch.tv/helix",
});

//axios.defaults.headers.common["Authorization"] = accessToken;

export default twitch;
