import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
        navigate(`/movie/${1}`)
      }
    } catch (err) {
      console.log(err);
    }

    // const data = await response.json();

    // if (response.ok) {
    //   console.log(data);
    // } else {
    //   console.log(data.error);
    // }
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
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="account-btn">Login</button>
    </form>
  );
};

export default Login;
