import React, { useState } from "react";
import styles from "./lexistingUser.module.css";
import illustration from "../assets/illustration.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Импортируем react-modal

const LoggedUser = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    // Действие при выходе
    localStorage.removeItem("refreshToken"); // Удалить refreshToken из localStorage
    localStorage.removeItem("accessToken"); // Удалить accessToken из localStorage
    navigate("/login"); // Перенаправить на страницу входа
  };

  return (
    <div className={styles.mainwrapper}>
      <div className={styles.text}>
        <p className={styles.text__header}>Добро пожаловать!</p>
        <p className={styles.text__name}>Lorby - твой личный репетитор</p>
      </div>
      <div className={styles.image}>
        <img src={illustration} alt="" />
      </div>
      <div className={styles.button}>
        <button onClick={handleOpenModal} className={styles.logout}>
          Выйти
        </button>
      </div>

      {/* Модальное окно */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <p className={styles.modal__header}>Выйти?</p>
        <p className={styles.modal__text}>Точно выйти?</p>
        <button onClick={handleLogout} className={styles.modal__logout_out}>
          Да, точно
        </button>
        <button onClick={handleCloseModal} className={styles.modal__logout_in}>
          Нет, остаться
        </button>
      </Modal>
    </div>
  );
};

export default LoggedUser;
