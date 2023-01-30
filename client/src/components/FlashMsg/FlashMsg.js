import React from "react";
import FlashMessage from "react-flash-message";
import "./FlashMsg.css";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const FlashMsg = ({ msg, type }) => {
  return (
    <FlashMessage duration={3000}>
      {type === "error" ? (
        <p className="flash-message error">
          <FaExclamationTriangle /> {msg}
        </p>
      ) : (
        <p className="flash-message success">
          <FaCheckCircle /> {msg}
        </p>
      )}
    </FlashMessage>
  );
};

export default FlashMsg;
