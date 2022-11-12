import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { useDispatch } from 'react-redux';
import Home from './Home';
import { Link } from 'react-router-dom';
import AccountProfile from './AccountProfile';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error, isLoggedIn, role } = props;
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    dispatch(authenticate({ username, password }, formName));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} name={name} className='login-container'>
          <h2>{displayName}</h2>
          <div>
            <label htmlFor='username'></label>
            <input name='username' type='text' placeholder='Your Username' />
          </div>
          <div>
            <label htmlFor='password'></label>
            <input
              name='password'
              type='password'
              placeholder='Your Password'
            />
          </div>
          <div>
            <button type='submit' className='form-button'>
              {displayName}
            </button>
          </div>
          {error && error.response && (
            <div className='auth-error'>*{error.response.data}</div>
          )}
          <p className='signup-prompt'>
            New here?{' '}
            <Link to='/signup' className='signup-link'>
              Sign up
            </Link>
          </p>
        </form>
      ) : isLoggedIn && role === 'user' ? (
        <Home />
      ) : isLoggedIn && role === 'admin' ? (
        <AccountProfile />
      ) : <header>Page Cannot be Found</header>}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
    role: state.auth.role,
  };
};

export const Login = connect(mapLogin)(AuthForm);
