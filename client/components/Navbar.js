import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { BsFillCartFill } from "react-icons/bs";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h3>
      <Link to="/home" className="link">
        FSA-TRAVEL
      </Link>
    </h3>
    <nav className="nav-menu">
      {isLoggedIn ? (
        <div>
          <Link to="/home" className="link">
            Home
          </Link>
          <a href="#" onClick={handleClick} className="link">
            Logout
          </a>
          <button className="cart">
            <BsFillCartFill />
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/signup" className="link">
            Sign Up
          </Link>
          <button className="cart">
            <BsFillCartFill />
          </button>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
