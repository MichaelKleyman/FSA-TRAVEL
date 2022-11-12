import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from './cart/Cart';
const Navbar = ({ isLoggedIn, userId }) => (
  <div>
    <nav className='nav-menu'>
      {isLoggedIn ? (
        <div className='sign-log-link'>
          <Link to='/home' className='nav-link logo'>
            FSA-TRAVEL
          </Link>
          <Link to='/home' className='nav-link float-home'>
            Home
          </Link>
          <Link to={`/profile/${userId}`} className='nav-link float-account'>
            Account
          </Link>
          <Cart />
        </div>
      ) : (
        <div>
          <div className='sign-log-link'>
            <Link to='/home' className='nav-link logo'>
              FSA-TRAVEL
            </Link>
            <Link to='/login' className='nav-link float-login'>
              Login
            </Link>

            <Link to='/home' className='nav-link float-signup'>
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
    userId: state.auth.id,
  };
};

export default connect(mapState)(Navbar);
