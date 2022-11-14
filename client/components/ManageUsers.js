import React from 'react';
import { getAllUsers } from '../store/admin';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const ManageUsers = ({ users, allUsers, role }) => {
  console.log('>>>>', role);
  useEffect(() => {
    allUsers();
  }, []);
  return (
    <div className='task-container'>
      {role === 'admin' ? (
        <div>
          <h1 className='task-title'>Admin Can Manage Users</h1>
          <div>
            <ul className='users-list'>
              {users.map((user) => (
                <li key={user.id} className='user'>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>Oops Page Not Found</div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    users: state.admin,
    role: state.auth.role,
  };
};

const mapDispatch = (dispatch) => {
  return {
    allUsers() {
      dispatch(getAllUsers());
    },
  };
};

export default connect(mapState, mapDispatch)(ManageUsers);
