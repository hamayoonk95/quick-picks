import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("/user-login", {
        username: username,
        password: password,
      });
      console.log(response);
      navigate("/analytics");
    } catch (err) {
      if(err.response) {
        setMsg(err.response.data);
      }
    }
  };

  return (
    <form
      method="POST"
      action=""
      onSubmit={handleSubmit}
      className="account-form"
    >
    <p className="error-msg">{msg}</p>
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