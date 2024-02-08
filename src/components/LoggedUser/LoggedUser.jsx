import React from "react";
import styles from "./loggedUser.module.css";
import illustration from "../assets/illustration.png";

const LoggedUser = () => {
  return (
    <div className={styles.mainwrapper}>
      <div className={styles.text}>
        <p className={styles.text__header}>С возвращением!</p>
        <p className={styles.text__name}>Lorby - твой личный репетитор</p>
      </div>
      <div className={styles.image}>
        <img src={illustration} alt="" />
      </div>
      <div className={styles.button}>
        <button className={styles.logout}>Выйти</button>
      </div>
    </div>
  );
};

export default LoggedUser;
