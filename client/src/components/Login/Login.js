import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <form className="account-form">
      <label>Username</label>
      <input type="text" />
      <label>Password</label>
      <input type="text" />
      <button className="account-btn">Login</button>
    </form>
  );
};

export default Login;
