import React, { useEffect, useState } from "react";
import styles from "./Registration.module.css";
import illustration from "../assets/illustration.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanErrorState,
  cleanStatusState,
  registerUser,
} from "../../store/userSlice";

const RegistrationForm = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    password_confirm: "",
  });

  const { loading, status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanErrorState());
    dispatch(cleanStatusState());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={styles.form__input}
            type="email"
            placeholder="Введи адрес почты"
          />
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className={styles.form__input}
            type="text"
            placeholder="Придумай логин"
          />

          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            onChange={(e) =>
              setUser({ ...user, password_confirm: e.target.value })
            }
            className={styles.form__input}
            type="password"
            placeholder="Повтори пароль"
          />
          <button onClick={handleClick} className={styles.form__button}>
            Далее
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
