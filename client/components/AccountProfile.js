import React from 'react';
import { logout, getUser } from '../store';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateUser } from '../store';
import ProfileInfo from './AccountProfile/ProfileInfo';
import OrderHistory from './OrderHistory';
const AccountProfile = ({ handleClick, user }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [popUpToggle, setPopUpToggle] = useState(false);
  const changeContent = (user) => {
    setUserInfo(user);
    setPopUpToggle(!popUpToggle);
  };

  function handleChange(e) {
    const newUserInfo = userInfo;
    newUserInfo[e.target.name] = e.target.value;
    setUserInfo(newUserInfo);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(user.id, userInfo));
    changeContent();
  }

  useEffect(() => {
    getUser(user.id);
  }, []);

  return (
    <div className='account-container'>
      <div className='profile-container'>
        {user.role === 'user' ? (
          <ProfileInfo
            user={user}
            userInfo={userInfo}
            handleClick={handleClick}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            popUpToggle={popUpToggle}
            changeContent={changeContent}
            role={user.role}
          />
        ) : (
          <ProfileInfo
            user={user}
            userInfo={userInfo}
            handleClick={handleClick}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            popUpToggle={popUpToggle}
            changeContent={changeContent}
            role={user.role}
          />
        )}
      </div>
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