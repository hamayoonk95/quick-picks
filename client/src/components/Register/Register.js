import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import FlashMsg from "../FlashMsg/FlashMsg";

const Register = ({ toggle, setMsg, responseType, setResponseType }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    setMsg("");
  }, [
    username,
    password,
    firstName,
    lastName,
    email,
    error.firstName,
    error.lastName,
    error.username,
    error.email,
    error.password,
  ]);

  const validate = () => {
    let errors = {};

    if (!firstName) {
      setResponseType("error");
      errors.firstName = "First name is required";
    } else if (firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters long";
    }
    if (!lastName) {
      setResponseType("error");
      errors.lastName = "Last name is required";
    } else if (lastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters long";
    }
    if (!username) {
      setResponseType("error");
      errors.username = "Username is required";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
    if (!email) {
      setResponseType("error");
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      setResponseType("error");
      errors.password = "Password is required";
    } else if (password.length < 8) {
      setResponseType("error");
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/user-register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        });

        if (response.data.success) {
          setResponseType("success");
          setMsg(response.data.success);
          setTimeout(() => {
            toggle();
          }, 2000);
        }
      } catch (err) {
        setResponseType("error");
        setMsg(err.response.data.error);
      }
    }
  };

  return (
    <div className="register-page">
    <h2 className="page-title">Register</h2>
      <form method="POST" onSubmit={handleSubmit} className="account-form">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {error.firstName && (
          <FlashMsg msg={error.firstName} type={responseType} />
        )}
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
        {error.lastName && (
          <FlashMsg msg={error.lastName} type={responseType} />
        )}
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error.username && (
          <FlashMsg msg={error.username} type={responseType} />
        )}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <FlashMsg msg={error.email} type={responseType} />}
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && (
          <FlashMsg msg={error.password} type={responseType} />
        )}
        <button className="c-account-btn">Create Account</button>
      </form>
      <button className="c-account-btn" onClick={toggle}>
        Back to Login
      </button>
    </div>
  );
};

export default Register;
