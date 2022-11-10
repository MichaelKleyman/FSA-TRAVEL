import React from "react";
import { Link } from "react-router-dom";

export const AccountCreated = () => {
  return (
    <div className="createdPage">
      <h2>You have successfully created your account! Please login below.</h2>

      <button id="login">
        <Link to="./login">Login</Link>
      </button>
    </div>
  );
};
