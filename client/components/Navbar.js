import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Cart from './cart/Cart';
const Navbar = ({ isLoggedIn, handleClick }) => (
  <div>
    <nav className="nav-menu">
      {isLoggedIn ? (
        <div className="sign-log-link">
          <Link to="/home" className="nav-link logo">
            FSA-TRAVEL
          </Link>
          <Link to="/home" className="nav-link float-home">
            Home
          </Link>
          <Link to="/profile/id" className="nav-link float-account">
            Account
          </Link>
          {/* <a href='#' onClick={handleClick} className='nav-link float-logout'>
            Logout
          </a> */}
          <Cart />
        </div>
      ) : (
        <div>
          <div className="sign-log-link">
            <Link to="/home" className="nav-link logo">
              FSA-TRAVEL
            </Link>
            <Link to="/login" className="nav-link float-login">
              Login
            </Link>

            <Link to="/home" className="nav-link float-signup">
              Home
            </Link>
            <Cart />
          </div>
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

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

export default connect(mapState)(Navbar);
