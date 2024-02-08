import React, { useEffect } from "react";
import styles from "./loginForm.module.css";
import illustration from "../assets/illustration.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import {
  cleanErrorState,
  cleanStatusState,
  loginUser,
} from "../../store/userSlice";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { status, error } = useSelector((state) => state.user);
  console.log(status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = () => {
    toast.error("Неверный логин или пароль");
  };

  // useEffect(() => {
  //   dispatch(cleanErrorState());
  //   dispatch(cleanStatusState());
  // }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
    console.log(status);
    status === "Success!" ? navigate("/logged") : notify();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
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
          <ToastContainer className={styles.toastContainer} />

          <div className={styles.form__main_title}>
            <p className={styles.form__text}>Вэлком бэк!</p>
          </div>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "48px",
              marginBottom: "48px",
            }}
            className={styles.form__registraition}
            action=""
          >
            <Input
              sx={{ fontSize: "15px", fontWeight: "regular", letterSpacing: 1 }}
              className={styles.form__input}
              disableUnderline={true}
              type="text"
              placeholder="Введи логин"
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
            />
            <Input
              sx={{ fontSize: "15px", fontWeight: "regular", letterSpacing: 1 }}
              className={styles.form__input}
              type={showPassword ? "text" : "password"}
              placeholder="Введи пароль"
              disableUnderline={true}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <button onClick={handleLogin} className={styles.form__button}>
              Войти
            </button>
          </FormControl>
          <NavLink to="/register" className={styles.form__bottom_link}>
            <p className={styles.form__bottom_text}>У меня еще нет аккаунта</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
