import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div className="container">
      <h3 className="title">Book Your Flights {username}</h3>
      <div className="outer-form">
        <form>
          <label>From:</label>
          <input type="text" placeholder="Leaving from..."></input>
          <label>To:</label>
          <input type="text" placeholder="Going to..." />
          <button type="submit" className="form-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
