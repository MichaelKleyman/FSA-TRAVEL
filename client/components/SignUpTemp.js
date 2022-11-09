import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error } = props;
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setUser({ [event.target.name]: event.target.value });
    setSubmitted(false);
    setValid(false);
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
        formName, history
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="signup-container">
        <h2>{displayName}</h2>
        <div>
          <label htmlFor="username">
            <small>Username:</small>
          </label>
          <input name="username" type="text" onChange={handleChange} />
          {/* {!user.username && error ? (
            <div className="auth-error">*Username is Required</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="password">
            <small>Password:</small>
          </label>
          <input name="password" type="password" onChange={handleChange} />
          {/* {!user.password && error ? (
            <div className="auth-error">*Password is Required</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="firstName">
            <small>First Name:</small>
          </label>
          <input name="firstName" type="firstName" onChange={handleChange} />
          {/* {!user.firstName && error ? (
            <div className="auth-error">*First name is Required</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name:</small>
          </label>
          <input name="lastName" type="lastName" onChange={handleChange} />
          {/* {!user.lastName && error ? (
            <div className="auth-error">*Last name is Required</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="email">
            <small>Email:</small>
          </label>
          <input name="email" type="email" onChange={handleChange} />
          {/* {!user.email && error ? (
            <div className="auth-error">*Email is Required</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="phone">
            <small>Phone Number:</small>
          </label>
          <input name="phone" type="phone" onChange={handleChange} />
          {/* {!user.phone && error ? (
            <div className="auth-error">*Phone number is Required</div>
          ) : null} */}
        </div>
        <div>
          <button type="submit" className="form-button">
            {displayName}
          </button>
        </div>
        {error && error.response && (
          <div className="auth-error">*{error.response.data}</div>
        )}
      </form>
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
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

export const Signup = connect(mapSignup)(AuthForm);
