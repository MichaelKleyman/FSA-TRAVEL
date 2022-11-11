import React from 'react';
import { logout, getUser } from '../store';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const AccountProfile = ({ handleClick, user }) => {
  useEffect(() => {
    getUser(user);
  }, []);
  return (
    <div>
      <h1 className='logout-link'>Hello {user}</h1>
      <a href='#' onClick={handleClick} className='logout-link'>
        Logout
      </a>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getUser() {
      dispatch(getUser());
    },
  };
};

export default connect(mapState, mapDispatch)(AccountProfile);
