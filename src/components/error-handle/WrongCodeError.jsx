import React from "react";
import styles from "./ErrorHandle.module.css";
import { useSelector } from "react-redux";

const WrongCodeError = () => {
  const error = useSelector(({ userSlice }) => userSlice.wrongCodeError);

  if (error) {
    return (
      <div>
        <p className={styles.code}>Неверный код</p>
      </div>
    );
  }
  return null;
};

export default WrongCodeError;
