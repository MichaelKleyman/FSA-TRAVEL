import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createUser } from "../store/signUp";
import { useHistory } from "react-router-dom";

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
      history.push("/created");
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
    <form className="booking-container">
      <h2>Please fill out this form to create an account:</h2>
      {submitted && valid ? (
        <div className="submitted" style={{ color: "green" }}>
          "You have successfully created an account!"
        </div>
      ) : null}
      <label htmlFor="username"></label>
      <input
        name="username"
        value={user.username || ""}
        onChange={handleUsername}
        placeholder="Your Username:"
      />
      {!user.username && submitted ? (
        <span style={{ color: "red" }}>Username is Required</span>
      ) : null}

      <label htmlFor="password"></label>
      <input
        name="password"
        value={user.password || ""}
        onChange={handlePassword}
        placeholder="Your Password:"
      />
      {!user.password && submitted ? (
        <span style={{ color: "red" }}>Password is Required</span>
      ) : null}


      <label htmlFor="firstname">First Name:</label>
      <input
        firstName="firstname"
        value={user.firstName || ''}
        onChange={handleFirstName}
        placeholder="Your First Name:"
      />
      {!user.firstName && submitted ? (
        <span style={{ color: "red" }}>First Name is Required</span>
      ) : null}

      <label htmlFor="lastName"></label>
      <input
        name="lastName"
        value={user.lastName || ""}
        onChange={handleLastName}
        placeholder="Your Last Name:"
      />
      {!user.lastName && submitted ? (
        <span style={{ color: "red" }}>Last Name is Required</span>
      ) : null}

      <label htmlFor="email"></label>
      <input
        name="email"
        value={user.email || ""}
        onChange={handleEmail}
        placeholder="Your Email:"
      />
      {!user.email && submitted ? (
        <span style={{ color: "red" }}>Email is Required</span>
      ) : null}

      <label htmlFor="phone"></label>
      <input
        name="phone"
        value={user.phone || ""}
        onChange={handlePhone}
        placeholder="Your Phone Number:"
      />
      {!user.phone && submitted ? (
        <span style={{ color: "red" }}>Phone Number is Required</span>
      ) : null}

      {submitted && valid ? (
        <button onClick={handleClear}>Clear</button>
      ) : (
        <button className="create-account-btn" onClick={handleSubmit}>
          Create Account
        </button>
      )}
    </form>
  );
};

export default SignUp;
