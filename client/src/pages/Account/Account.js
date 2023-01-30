import React, { useState } from "react";
import "./Account.css";
import { Login, Register, FlashMsg } from "../../components";

const Account = () => {
  const [registered, setRegistered] = useState(false);
  const [msg, setMsg] = useState("");
  const [responseType, setResponseType] = useState("");

  const handleRegistered = () => {
    setRegistered(!registered);
  };

  return (
    <div className="flex-center login-page">
      {msg && <FlashMsg msg={msg} type={responseType} />}
      {registered ? (
        <Register
          toggle={handleRegistered}
          setMsg={setMsg}
          responseType={responseType}
          setResponseType={setResponseType}
        />
      ) : (
        <>
          <Login
            setMsg={setMsg}
            responseType={responseType}
            setResponseType={setResponseType}
          />
          <div className="new-account" onClick={handleRegistered}>
            Create New Account
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
