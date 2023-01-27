import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e, username, password) => {
    // e.preventDefault();

    const response = await fetch('/user-login', username, password);
    console.log(response);
    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        console.log(data.error);
    }
  }

  return (
    <form method="POST" onSubmit={handleSubmit} className="account-form">
      <label>Username</label>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <label>Password</label>
      <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="account-btn">Login</button>
    </form>
  );
};

export default Login;
