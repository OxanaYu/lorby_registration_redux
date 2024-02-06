import React, { useEffect, useState } from "react";
import styles from "./Registration.module.css";
import illustration from "../assets/illustration.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  cleanErrorState,
  cleanStatusState,
  registerUser,
} from "../../store/userSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";

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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Неправильный формат email")
      .required("Обязательное поле"),
    username: Yup.string().required("Обязательное поле"),
    password: Yup.string()
      .required("Обязательное поле")
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(15, "Пароль должен содержать максимум 15 символов")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Пароль должен содержать минимум 1 строчную букву, 1 прописную букву, 1 цифру и 1 спецсимвол"
      ),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Обязательное поле"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Здесь вы можете отправить данные на сервер
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
      {error ? (
        <div className={styles.main}>
          <h2>{error}</h2>
          <h2>{status}</h2>
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
            <Formik
              user={user}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={styles.form__registraition}>
                  <Field
                    className={styles.form__input}
                    type="email"
                    name="email"
                    placeholder="Введи адрес почты"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error_message}
                  />

                  <Field
                    className={styles.form__input}
                    type="text"
                    name="username"
                    placeholder="Придумай логин"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={styles.error_message}
                  />

                  <Field
                    className={styles.form__input}
                    type="password"
                    name="password"
                    placeholder="Создай пароль"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <ul>
                    <li
                      className={
                        styles.errors.password && styles.errors.password_confirm
                          ? styles.error_message
                          : ""
                      }
                    >
                      От 8 до 15 символов
                    </li>
                    <li
                      className={
                        styles.errors.password && styles.errors.password_confirm
                          ? styles.error_message
                          : ""
                      }
                    >
                      Строчные и прописные буквы
                    </li>
                    <li
                      className={
                        styles.errors.password && styles.errors.password_confirm
                          ? styles.error_message
                          : ""
                      }
                    >
                      Минимум 1 цифра
                    </li>
                    <li
                      className={
                        styles.errors.password && styles.errors.password_confirm
                          ? styles.error_message
                          : ""
                      }
                    >
                      Минимум 1 спецсимвол(!,'',#,$...)
                    </li>
                  </ul>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.error_message}
                  />
                  <ul>
                    <li>От 8 до 15 символов</li>
                    <li>Строчные и прописные буквы</li>
                    <li>Минимум 1 цифра</li>
                    <li>Минимум 1 спецсимвол(!,'',#,$...)</li>
                  </ul>

                  <Field
                    className={styles.form__input}
                    type="password"
                    name="password_confirm"
                    placeholder="Повтори пароль"
                    onChange={(e) =>
                      setUser({ ...user, password_confirm: e.target.value })
                    }
                  />
                  <ErrorMessage
                    name="password_confirm"
                    component="div"
                    className={styles.error_message}
                  />

                  <button onClick={handleClick} className={styles.form__button}>
                    Далее
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default RegistrationForm;
