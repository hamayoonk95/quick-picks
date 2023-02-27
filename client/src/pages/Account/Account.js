import React, { useState } from "react";
import "./Account.css";
import { Login, Register, FlashMsg } from "../../components";

const Account = () => {
  // state variables to keep track of whether the user is registered
  const [registered, setRegistered] = useState(false);
  // state variable flash messages that needs to be displayed and their type
  const [msg, setMsg] = useState("");
  const [responseType, setResponseType] = useState("");

  // toggle the registered state variable when the user clicks on "Create New Account" button
  const handleRegistered = () => {
    setRegistered(!registered);
  };

  return (
    <div className="flex-center account-page">
      {/* Display any flash messages that needs to be shown */}
      <div className="flashMsg" aria-live="assertive">
        {msg && <FlashMsg msg={msg} type={responseType} />}
      </div>

      {/* Display the appropriate component based on whether the user is registered */}
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

          {/* Change the state variable registered to display register form when this button is clicked*/}
          <div
            className="new-account"
            onClick={handleRegistered}
            tabIndex="0"
            role="button"
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleRegistered();
              }
            }}
          >
            Create New Account
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
