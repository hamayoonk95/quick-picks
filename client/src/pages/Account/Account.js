import React, { useState } from "react";
import "./Account.css";
import { Login, CreateAccount } from "../../components";

const Account = () => {
  const [createAccount, setCreateAccount] = useState(false);

  const handleCreateAccount = () => {
    setCreateAccount(!createAccount);
  };

  return (
    <div className="flex-center login-page">
      {createAccount ? (
        <CreateAccount toggle={handleCreateAccount} />
      ) : (
        <>
          <Login />
          <div className="new-account" onClick={handleCreateAccount}>
            Create New Account
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
