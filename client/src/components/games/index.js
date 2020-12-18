import React from "react";
import { connect } from "react-redux";
import { loginTwitch } from "../../actions";

class Games extends React.Component {
  componentDidMount() {
    this.props.loginTwitch();
    // const urlParams = new URLSearchParams(this.props.location.search);
    // const code = urlParams.get("code");
    // console.log(code);
  }

  render() {
    return <div>Game</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { topGames: state.topGames };
};

export default connect(mapStateToProps, { loginTwitch })(Games);
