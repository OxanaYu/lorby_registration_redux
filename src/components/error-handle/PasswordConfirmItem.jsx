import React from "react";
import styles from "./ErrorHandle.module.css";

const PasswordConfirmItem = ({ values }) => {
  if (
    values.password !== values.password_confirm &&
    values.password_confirm.length > 1
  ) {
    return <p className={styles.password}>Пароли не совпадают</p>;
  }

  return null;
};

export default PasswordConfirmItem;
