import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createUser } from '../store/signUp';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const [user, setUser] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleUsername = (event) => {
    setUser({ ...user, username: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handlePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handleFirstName = (event) => {
    setUser({ ...user, firstName: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handleLastName = (event) => {
    setUser({ ...user, lastName: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handleEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handlePhone = (event) => {
    setUser({ ...user, phone: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (
      user.username &&
      user.password &&
      user.firstName &&
      user.lastName &&
      user.email &&
      user.phone
    ) {
      setValid(true);
      dispatch(createUser({ ...user }));
      history.push('/created');
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    setSubmitted(false);
    setValid(false);
    setUser({
      ...user,
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
    });
  };

  return (
    <form className="form flex-column">
      <h2>Please fill out this form to create an account:</h2>
      {submitted && valid ? (
        <div className="submitted">
          "You have successfully created an account!"
        </div>
      ) : null}
      <label htmlFor="username">Username:</label>
      <input
        name="username"
        value={user.username || ''}
        onChange={handleUsername}
      />
      {!user.username && submitted ? <span>Username is Required</span> : null}

      <label htmlFor="password">Password:</label>
      <input
        name="password"
        value={user.password || ''}
        onChange={handlePassword}
      />
      {!user.password && submitted ? <span>Password is Required</span> : null}

      <label htmlFor="firstName">First Name:</label>
      <input
        name="firstName"
        value={user.firstName || ''}
        onChange={handleFirstName}
      />
      {!user.firstName && submitted ? (
        <span>First Name is Required</span>
      ) : null}

      <label htmlFor="lastName">Last Name:</label>
      <input
        name="lastName"
        value={user.lastName || ''}
        onChange={handleLastName}
      />
      {!user.lastName && submitted ? <span>Last Name is Required</span> : null}

      <label htmlFor="email">Email Address:</label>
      <input name="email" value={user.email || ''} onChange={handleEmail} />
      {!user.email && submitted ? <span>Email is Required</span> : null}

      <label htmlFor="phone">Phone Number:</label>
      <input name="phone" value={user.phone || ''} onChange={handlePhone} />
      {!user.phone && submitted ? <span>Phone Number is Required</span> : null}

      {submitted && valid ? (
        <button onClick={handleClear}>Clear</button>
      ) : (
        <button onClick={handleSubmit}>Create Account</button>
      )}
    </form>
  );
};

export default SignUp;
