import React, { useEffect, useState } from "react";
import "./alert.css";
import CheckIcon from "../icons/CheckIcon";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setVisible } from "../../store/alertSlice";
const Alert = () => {
  const message = useSelector((state) => state.alert.message);
  const isVisible = useSelector((state) => state.alert.isVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(setMessage(null));
      dispatch(setVisible(false));
    }, 5000);

    return () => clearTimeout(timeOutId);
  }, [message]);

  return (
    <>
      {isVisible && message && (
        <div className="alert alert_container">
          <CheckIcon checked="true" /> {message}
        </div>
      )}
    </>
  );
};

export default Alert;
