import React, { useEffect, useState } from "react";
import "./alert.css";
import { useTasks } from "../../context/tasksContext";
import CheckIcon from "../icons/CheckIcon";
const Alert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { message, setMessage } = useTasks();
  useEffect(() => {
    if (message && message != "") setShowAlert(true);
    const timeOutId = setTimeout(() => {
      setMessage();
    }, 5000);

    return () => clearTimeout(timeOutId);
  }, [message]);

  return (
    <>
      {showAlert && message && (
        <div className="alert alert_container">
          <CheckIcon checked="true" /> {message}
        </div>
      )}
    </>
  );
};

export default Alert;
