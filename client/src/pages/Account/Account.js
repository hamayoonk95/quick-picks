import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import { Login, CreateAccount } from "../../components";

const Account = () => {
  const [createAccount, setCreateAccount] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleCreateAccount = () => {
    setCreateAccount(!createAccount);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);
  return (
    <div className="flex-center login-page">
      {loggedIn ? (
        <div>Hello {userData.username}</div>
      ) : (
        <>
          {createAccount ? (
            <CreateAccount onLogin={handleLogin} toggle={handleCreateAccount} />
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <div className="new-account" onClick={handleCreateAccount}>
                Create New Account
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
