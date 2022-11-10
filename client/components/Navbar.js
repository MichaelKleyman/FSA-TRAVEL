import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import { BsFillCartFill } from 'react-icons/bs';


const Navbar = ({ handleClick, isLoggedIn }) => (
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
          <a href='#' onClick={handleClick} className='nav-link float-logout'>
            Logout
          </a>
          <button className='cart float-cart'>

            <BsFillCartFill size={35} />

          </button>
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

            <Link to="/home" className="nav-link float-signup">
              Home
            </Link>
            <button className='cart float-cart'>
              <BsFillCartFill size={35} />

            </button>
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

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
