import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error, isLoggedIn } = props;
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setUser({ [event.target.name]: event.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const email = evt.target.email.value;
    const phone = evt.target.phone.value;
    dispatch(
      authenticate(
        { username, password, firstName, lastName, email, phone },
        formName
      )
    );
  };

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} name={name} className='signup-container'>
          <h2>{displayName}</h2>
          <div>
            <input
              name='username'
              type='text'
              onChange={handleChange}
              placeholder='Your Username'
            />
            {/* {!user.username && error ? (
            <div className="auth-error">*Username is Required</div>
          ) : null} */}
          </div>
          <div>
            <input
              name='password'
              type='password'
              onChange={handleChange}
              placeholder='Your Password'
            />
            {/* {!user.password && error ? (
            <div className="auth-error">*Password is Required</div>
          ) : null} */}
          </div>
          <div>
            <input
              name='firstName'
              type='firstName'
              onChange={handleChange}
              placeholder='Your First Name'
            />
            {/* {!user.firstName && error ? (
            <div className="auth-error">*First name is Required</div>
          ) : null} */}
          </div>
          <div>
            <input
              name='lastName'
              type='lastName'
              onChange={handleChange}
              placeholder='Your Last Name'
            />
            {/* {!user.lastName && error ? (
            <div className="auth-error">*Last name is Required</div>
          ) : null} */}
          </div>
          <div>
            <input
              name='email'
              type='email'
              onChange={handleChange}
              placeholder='Your Email'
            />
            {/* {!user.email && error ? (
            <div className="auth-error">*Email is Required</div>
          ) : null} */}
          </div>
          <div>
            <input
              name='phone'
              type='phone'
              onChange={handleChange}
              placeholder='Your Phone Number'
            />
            {/* {!user.phone && error ? (
            <div className="auth-error">*Phone number is Required</div>
          ) : null} */}
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
            Already have an account?{' '}
            <Link to='/login' className='signup-link'>
              Log in
            </Link>
          </p>
        </form>
      ) : (
        <Home />
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

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export const Signup = connect(mapSignup)(AuthForm);
