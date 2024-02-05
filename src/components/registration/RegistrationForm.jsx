import React from "react";
import styles from "./Registration.module.css";
import illustration from "../assets/illustration.png";

const RegistrationForm = () => {
  return (
    <div className={styles.main}>
      <div className={styles.image}>
        <div className={styles.image__top}>
          <img src={illustration} alt="" />
        </div>
        <div className={styles.image__bottom}>
          <p className={styles.image__lorby}>Lorby</p>
          <p className={styles.image__text}>Твой личный репетитор</p>
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.form__main_title}>
          <p>Создать аккаунт</p>
          <p>Lorby</p>
        </div>
        <form className={styles.form__registraition} action="">
          <input
            className={styles.form__input}
            type="email"
            placeholder="Введи адрес почты"
          />
          <input
            className={styles.form__input}
            type="text"
            placeholder="Придумай логин"
          />
          <input
            className={styles.form__input}
            type="password"
            placeholder="Создай пароль"
          />
          <ul>
            <li>От 8 до 15 символов</li>
            <li>Строчные и прописные буквы</li>
            <li>Минимум 1 цифра</li>
            <li>Минимум 1 спецсимвол(!,'',#,$...)</li>
          </ul>
          <input
            className={styles.form__input}
            type="password"
            placeholder="Повтори пароль"
          />
          <button className={styles.form__button}>Далее</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
