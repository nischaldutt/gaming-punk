import React, { useEffect } from "react";
import { connect } from "react-redux";
import TwitchStreams from "./TwitchStreams";
import { setAccessToken } from "../../actions";

const Games = ({
  history: {
    location: { search: searchQuery },
  },
  setAccessToken,
  accessToken,
}) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(searchQuery);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, [searchQuery, setAccessToken]);

  function renderTwitchLoginButton() {
    if (!accessToken) {
      return (
        <a
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&response_type=code&scope=user_read`}
        >
          Login to twitch
        </a>
      );
    } else {
      return <TwitchStreams accessToken={accessToken} />;
    }
  }

  return <div>{renderTwitchLoginButton()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { accessToken: state.accessToken };
};

export default connect(mapStateToProps, { setAccessToken })(Games);
