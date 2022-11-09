import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createUser } from "../store/signUp";

const SignUp = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [user, setUser] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setSubmitted(false);
    setValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (user.username && user.email && user.phone) {
      setValid(true);
    }
    dispatch(createUser({ ...user }));
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
        value={user.username || ""}
        onChange={handleChange}
      />
      {!user.username && submitted ? <span>Username is Required</span> : null}

      <label htmlFor="password">Password:</label>
      <input
        name="password"
        value={user.password || ""}
        onChange={handleChange}
      />
      {!user.password && submitted ? <span>Password is Required</span> : null}

      <label htmlFor="firstName">First Name:</label>
      <input
        name="firstName"
        value={user.firstName || ""}
        onChange={handleChange}
      />
      {!user.firstName && submitted ? (
        <span>First Name is Required</span>
      ) : null}

      <label htmlFor="lastName">Last Name:</label>
      <input
        name="lastName"
        value={user.lastName || ""}
        onChange={handleChange}
      />
      {!user.lastName && submitted ? <span>Last Name is Required</span> : null}

      <label htmlFor="email">Email Address:</label>
      <input name="email" value={user.email || ""} onChange={handleChange} />
      {!user.email && submitted ? <span>Email is Required</span> : null}

      <label htmlFor="phone">Phone Number:</label>
      <input name="phone" value={user.phone || ""} onChange={handleChange} />
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
