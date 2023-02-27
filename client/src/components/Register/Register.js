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

   // clears errors when input fields are updated
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

    // firstName validations
    if (!firstName) {
      setResponseType("error");
      errors.firstName = "First name is required";
    } else if (firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters long";
    }
    // lastName validation
    if (!lastName) {
      setResponseType("error");
      errors.lastName = "Last name is required";
    } else if (lastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters long";
    }
    // username validation
    if (!username) {
      setResponseType("error");
      errors.username = "Username is required";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
    // email validation
    if (!email) {
      setResponseType("error");
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    // password validation
    if (!password) {
      setResponseType("error");
      errors.password = "Password is required";
    } else if (password.length < 8) {
      setResponseType("error");
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  // handles form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // calls validate function to check for errors
    const errors = validate();
    // set Error state to the error message
    setError(errors);
    // if length of error is 0 then submit a post request to /user-register with user details as parameters
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/user-register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        });

        // if response has a success value then display success message
        if (response.data.success) {
          setResponseType("success");
          setMsg(response.data.success);
          // wait 2 seconds and call toggle function passed as props to display Login component
          setTimeout(() => {
            toggle();
          }, 2000);
        }
      } catch (err) {
        // if error then display error message
        setResponseType("error");
        setMsg(err.response.data.error);
      }
    }
  };

  return (
    // render register-page component
    <div className="register-page">
    <h2 className="page-title">Register</h2>

      {/* Register form */}
      <form method="POST" onSubmit={handleSubmit} className="account-form">
        
        {/* Input field for firstname */}
        <label htmlFor="firstname">First Name</label>
        <input
          id="firstname"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-invalid={error.firstName ? true : false}
          aria-describedby="firstname-error"
        />
        {/* Flash error message if firstname is invalid */}
        {error.firstName && (
          <FlashMsg msg={error.firstName} type={responseType} />
        )}

        {/* Input field for last name */}
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          // accessibility attributes to the input field
          aria-invalid={error.lastName ? true : false}
          aria-describedby="lastname-error"
        />
        {/* Flash error message if lastname is invalid */}
        {error.lastName && (
          <FlashMsg msg={error.lastName} type={responseType} />
        )}

        {/* Input field for username */}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={error.username ? true : false}
          aria-describedby="username-error"
        />
        {/* Flash error message if username invalid */}
        {error.username && <FlashMsg msg={error.username} type={responseType} />}

        {/* Input field for email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error.email ? true : false}
          aria-describedby="firstname-error"
        />
        {/* Flash error message if email is invalid */}
        {error.email && <FlashMsg msg={error.email} type={responseType} />}

        {/* Input field for password */}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Flash error message if password is invalid */}
        {error.password && (
          <FlashMsg msg={error.password} type={responseType} />
        )}

        <button type="submit" className="c-account-btn">Create Account</button>
      </form>

      {/* button to go toggle the login/register state */}
      <button className="c-account-btn" onClick={toggle}>
        Back to Login
      </button>

    </div>
  );
};

export default Register;
