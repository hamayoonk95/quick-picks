import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("/user-login", {
        username: username,
        password: password,
      });
      if(response.statusText == 'OK') {
        // localStorage.setItem('accessToken', response.data.accessToken);
        onLogin();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      method="POST"
      action=""
      onSubmit={handleSubmit}
      className="account-form"
    >
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="account-btn">Login</button>
    </form>
  );
};

export default Login;