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

  // clears errors when input fields are updated
  useEffect(() => {
    setMsg("");
    setPasswordError("");
    setUsernameError("");
  }, [username, password]);

  // handles form submission and removes errors flash messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    setUsernameError("");
    setPasswordError("");

    // validates username
    if (username === "") {
      isError = true;
      setResponseType("error");
      setUsernameError("Username cannot be empty");
    }

    // validates password
    if (password === "") {
      isError = true;
      setResponseType("error");
      setPasswordError("Password cannot be empty");
    }

    // If any input is invalid, returns early and doesn't submit form
    if (isError) {
      return;
    }

    try {
      // submit form with entered username and password to /user-login route
      const response = await axios.post("/user-login", {
        username: username,
        password: password,
      });
      // if successful, saves token to localStorage and navigates to analytics page
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/analytics");
    } catch (err) {
      if (err.response) {
        // if server responds with error, then display error message
        setResponseType("error");
        setMsg(err.response.data.error);
      }
    }
  };

  return (
    // login-page component
    <div className="login-page">
    {/* title of the login page */}
      <h2 className="page-title">Login</h2>
      {/* Form that posts to login route and handles user login input */}
      <form
        method="POST"
        action=""
        onSubmit={handleSubmit}
        className="account-form"
      >
      {/* Input field for username */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // accessibility attributes to the input field
          aria-invalid={usernameError ? true : false}
          aria-describedby="username-error"
        />
        {/* Flash error message if wrong username or mismatch */}
        {usernameError && <FlashMsg msg={usernameError} type={responseType} />}

        {/* Input for password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // accessibility attributes to the input field
          aria-label="Enter your password"
          aria-required="true"
        />
        {/* Flash error message if wrong password or mismatch */}
        {passwordError && <FlashMsg msg={passwordError} type={responseType} />}

        <button type="submit" className="account-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
