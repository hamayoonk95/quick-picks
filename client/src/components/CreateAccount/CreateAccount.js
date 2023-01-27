import React, { useState } from "react";
import "./CreateAccount.css";
import axios from "axios";

const CreateAccount = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user-register", {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
      if (response.statusText == "OK") {
        props.toggle();
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="account-form"
      >
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="c-account-btn">Create Account</button>
      </form>
      <button className="c-account-btn" onClick={props.toggle}>
        Back to Login
      </button>
    </>
  );
};

export default CreateAccount;
