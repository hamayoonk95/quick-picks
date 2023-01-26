import React from "react";
import "./Account.css";

const Account = () => {
  return (
    <div className="flex-center login-page">
      <form className="login-form">
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button className="login-btn">Login</button>
      </form>
      <a className="new-account" href="">Create New Account</a>
    </div>
  );
};

export default Account;
