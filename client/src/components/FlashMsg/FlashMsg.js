import React from "react";
import FlashMessage from "react-flash-message";
import "./FlashMsg.css";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

// FlashMsg component/ destructure props passed into it
const FlashMsg = ({ msg, type }) => {
  return (
    // FlashMessage component with a duration of 3 seconds
    <FlashMessage duration={3000}>
      {type === "error" ? (
        // If type prop is "error", render a paragraph element with "error" class and an error icon with the message
        <p className="flash-message error">
          <FaExclamationTriangle /> {msg}
        </p>
      ) : (
        // If type prop is not "error", render a paragraph element with "success" class and a success icon with the message
        <p className="flash-message success">
          <FaCheckCircle /> {msg}
        </p>
      )}
    </FlashMessage>
  );
};

export default FlashMsg;
