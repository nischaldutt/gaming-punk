import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopGames } from "../../actions";

import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
const Slide = require('./Slide').default;

export const TwitchStreams = ({ accessToken, fetchTopGames }) => {
  useEffect(() => {
    fetchTopGames(accessToken);
  }, [accessToken, fetchTopGames]);

  renderSlides() {
    
  }

  renderCarousal() {
    return (
      <AutoRotatingCarousel
      // label='Get started'
      // style={{ position: 'absolute' }}
    >
      
      <Slide
        media={<img src="" />}
        // mediaBackgroundStyle={{ backgroundColor: red[400] }}
        // style={{ backgroundColor: red[600] }}
        // title='This is a very cool feature'
        // subtitle='Just using this will blow your mind.'
      />
      </AutoRotatingCarousel>
    )
  }

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
