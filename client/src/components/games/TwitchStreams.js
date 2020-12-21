import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopGames } from "../../actions";

export const TwitchStreams = ({ accessToken, fetchTopGames }) => {
  useEffect(() => {
    fetchTopGames(accessToken);
  }, [accessToken]);
  return <div>TwitchStreams</div>;
};

const mapStateToProps = (state) => {
  return { topGames: state.topGames };
};

const mapDispatchToProps = {
  fetchTopGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitchStreams);

// rfcredux and rafce for code snippets
