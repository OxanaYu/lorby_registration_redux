import React, { useEffect } from "react";
import styles from "./Registration.module.css";
import illustration from "../assets/illustration.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanErrorState,
  cleanStatusState,
  registerUser,
} from "../../store/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

const RegistrationForm = () => {
  const { error } = useSelector((state) => state.user);
  const status = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    username: "",
    password: "",
    password_confirm: "",
  };

  const validate = (values) => {
    const errors = {};

    // Проверка на от 8 до 15 символов
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "Пароль должен содержать от 8 до 15 символов";
    }

    // Проверка на наличие строчных и прописных букв
    if (!/[a-z]/.test(values.password) || !/[A-Z]/.test(values.password)) {
      errors.password =
        "Пароль должен содержать как минимум одну строчную и одну заглавную букву";
    }

    // Проверка на наличие хотя бы одной цифры
    if (!/\d/.test(values.password)) {
      errors.password = "Пароль должен содержать как минимум одну цифру";
    }

    // Проверка на наличие хотя бы одного спецсимвола
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
      errors.password = "Пароль должен содержать как минимум один спецсимвол";
    }

    // Проверка совпадения паролей
    if (values.password !== values.password_confirm) {
      errors.password_confirm = "Пароли не совпадают";
    }

    return errors;
  };

  useEffect(() => {
    dispatch(cleanErrorState());
    dispatch(cleanStatusState());
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values));
    setSubmitting(false);
  };

  useEffect(() => {
    console.log("status after registr", status);
    status.message ==
    "User successfully registered. Confirmation code sent to your email."
      ? navigate("/confirm-email")
      : navigate("/register");
  }, [status]);

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
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form__registraition} action="">
              <Field
                className={styles.form__input}
                type="email"
                name="email"
                placeholder="Введи адрес почты"
              />
              <ErrorMessage
                name="email"
                component="p"
                className={styles.error_message}
              />

              <Field
                className={styles.form__input}
                type="text"
                name="username"
                placeholder="Придумай логин"
              />
              <ErrorMessage
                name="username"
                component="p"
                className={styles.error_message}
              />

              <Field
                className={styles.form__input}
                type="password"
                name="password"
                placeholder="Создай пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error_message}
              />

              <Field
                className={styles.form__input}
                type="password"
                name="password_confirm"
                placeholder="Повтори пароль"
              />
              <ErrorMessage
                name="password_confirm"
                component="div"
                className={styles.error_message}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.form__button}
              >
                {isSubmitting ? "Отправка..." : "Далее"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
