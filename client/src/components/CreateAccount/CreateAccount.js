import React from "react";
import "./CreateAccount.css";

const CreateAccount = (props) => {
  return (
    <>
    <form className="account-form">
      <label>Username</label>
      <input type="text" />
      <label>Email</label>
      <input type="email" />
      <label>Password</label>
      <input type="password" />
      <button className="c-account-btn">Create Account</button>
    </form>
    <button className="c-account-btn" onClick={props.toggle}>Back to Login</button>
    </>
  );
};

export default CreateAccount;
