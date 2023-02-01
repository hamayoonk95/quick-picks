import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlashMsg from "../FlashMsg/FlashMsg";

const Login = ({ setMsg, responseType, setResponseType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMsg("");
    setPasswordError("");
    setUsernameError("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      isError = true;
      setResponseType("error");
      setUsernameError("Username cannot be empty");
    }

    if (password === "") {
      isError = true;
      setResponseType("error");
      setPasswordError("Password cannot be empty");
    }

    if (isError) {
      return;
    }

    try {
      const response = await axios.post("/user-login", {
        username: username,
        password: password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/analytics");
    } catch (err) {
      if (err.response) {
        setResponseType("error");
        setMsg(err.response.data.error);
      }
    }
  };

  return (
    <div className="login-page">
    <h2 className="page-title">Login</h2>
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
      {usernameError && <FlashMsg msg={usernameError} type={responseType} />}
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <FlashMsg msg={passwordError} type={responseType} />}
      <button className="account-btn">Login</button>
    </form>
    </div>
  );
};

export default Login;
