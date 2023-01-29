import React, { useState, useEffect } from "react";
import "./Account.css";
import { Login, Register } from "../../components";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [registered, setRegistered] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/analytics");
  };

  const handleRegistered = () => {
    setRegistered(!registered);
  };

  return (
    <div className="flex-center login-page">
      {registered ? (
        <Register onLogin={handleLogin} toggle={handleRegistered} />
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <div className="new-account" onClick={handleRegistered}>
            Create New Account
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
