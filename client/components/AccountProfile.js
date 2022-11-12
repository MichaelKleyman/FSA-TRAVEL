import React from 'react';
import { logout, getUser } from '../store';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AccountProfile = ({ handleClick, user }) => {
  useEffect(() => {
    getUser(user.id);
  }, []);
  return (
    <div className='profile-container'>
      {user.role === 'user' ? (
        <div className='account-details'>
          <h1 className='account-title'>{user.username}'s Account Profile</h1>
          <div className='user-details'>
            <h4>Username</h4>
            <p className='user-info'>{user.username}</p>
          </div>
          <div className='user-details'>
            <h4>Name</h4>
            <p className='user-info'>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className='user-details'>
            <h4>Email</h4>
            <p className='user-info'>{user.email}</p>
          </div>
          <div className='user-details'>
            <h4>Phone Number</h4>
            <p className='user-info'>{user.phone}</p>
          </div>
          <button type='submit' className='logout-button'>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
          </button>
          <button type='submit' className='edit-button'>
            Edit
          </button>
        </div>
      ) : (
        <div className='account-details'>
          <h1 className='account-title'>
            <div>
              {user.username}'s' {user.role} Dashboard
            </div>
            <small className='admin-task'>
              <Link to='/admin/manageusers'>Manage Users</Link>
            </small>
          </h1>
          <hr style={{ color: 'black' }} />
          <div className='user-details'>
            <h4>Username</h4>
            <p className='user-info'>{user.username}</p>
          </div>
          <div className='user-details'>
            <h4>Name</h4>
            <p className='user-info'>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className='user-details'>
            <h4>Email</h4>
            <p className='user-info'>{user.email}</p>
          </div>
          <div className='user-details'>
            <h4>Phone Number</h4>
            <p className='user-info'>{user.phone}</p>
          </div>
          <button type='submit' className='logout-button'>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
          </button>
          <button type='submit' className='edit-button'>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
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
