import React, { useState } from "react";
import styles from "./lexistingUser.module.css";
import illustration from "../assets/illustration.png";
import { useNavigate } from "react-router-dom";

const LoggedUser = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true); // Показываем модальное окно при клике
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleStay = () => {
    setModalVisible(false);
  };

  return (
    <div
      className={`${styles.mainwrapper} ${
        modalVisible ? styles.modalOpen : ""
      }`}
    >
      <div className={styles.text}>
        <p className={styles.text__header}>Добро пожаловать!</p>
        <p className={styles.text__name}>Lorby - твой личный репетитор</p>
      </div>
      <div className={styles.image}>
        <img src={illustration} alt="" />
      </div>
      <div className={styles.button}>
        <button onClick={handleClick} className={styles.logout}>
          Выйти
        </button>
      </div>

      {/* Модальное окно */}
      <div className={`${styles.modal} ${modalVisible ? styles.visible : ""}`}>
        <p className={styles.modal__header}>Выйти?</p>
        <p className={styles.modal__text}>Точно выйти?</p>

        <button onClick={handleLogout} className={styles.modal__logout_out}>
          Да, точно
        </button>
        <button onClick={handleStay} className={styles.modal__logout_in}>
          Нет, остаться
        </button>
      </div>

      {/* Затемняющий фон */}
      {modalVisible && <div className={styles.overlay}></div>}
    </div>
  );
};

export default LoggedUser;
