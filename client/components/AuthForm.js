import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { useDispatch } from 'react-redux';
import Home from './Home';
import { Link, Redirect } from 'react-router-dom';
import AccountProfile from './AccountProfile';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error, isLoggedIn, role, id } = props;
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    dispatch(authenticate({ username, password }, formName));
  };

  return (
    <div className='login-signup-container'>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} name={name} className='login-container'>
          <h2 className='login-elements'>{displayName}</h2>
          <div className='login-elements'>
            <label htmlFor='username'></label>
            <input name='username' type='text' placeholder='Your Username' />
          </div>
          <div className='login-elements'>
            <label htmlFor='password'></label>
            <input
              name='password'
              type='password'
              placeholder='Your Password'
            />
          </div>
          <div className='login-elements'>
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
          <div className='pop-up-icons'>
            <FaFacebook size={35} />
            <FaTwitter size={35} />
            <FaInstagram size={35} />
          </div>
        </form>
      ) : isLoggedIn && role === 'user' ? (
        <Redirect to='/home' />
      ) : isLoggedIn && role === 'admin' ? (
        <Redirect to={`/profile/${id}`} />
      ) : (
        <header>Page Cannot be Found</header>
      )}
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
    id: state.auth.id,
  };
};

export const Login = connect(mapLogin)(AuthForm);
