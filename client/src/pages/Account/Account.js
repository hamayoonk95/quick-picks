import React, { useState} from "react";
import "./Account.css";
import { Login, Register } from "../../components";

const Account = () => {
  const [registered, setRegistered] = useState(false);

  const handleRegistered = () => {
    setRegistered(!registered);
  };

  return (
    <div className="flex-center login-page">
      {registered ? (
        <Register toggle={handleRegistered} />
      ) : (
        <>
          <Login />
          <div className="new-account" onClick={handleRegistered}>
            Create New Account
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
