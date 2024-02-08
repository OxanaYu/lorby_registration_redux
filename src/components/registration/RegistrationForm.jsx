import React, { useEffect } from "react";
import styles from "./Registration.module.css";
import illustration from "../assets/illustration.png";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import {
  cleanErrorState,
  cleanStatusState,
  registerUser,
} from "../../store/userSlice";
import { Formik, Form } from "formik";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorHandle from "../error-handle/ErrorHandle";
import PasswordConfirmItem from "../error-handle/PasswordConfirmItem";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { error } = useSelector((state) => state.user);
  const status = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup
      .string("Enter your username")
      .required("Username is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    password_confirm: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password confirmation is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password_confirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

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
          <p className={styles.form__header}>Создать аккаунт</p>
          <p className={styles.form__text}>Lorby</p>
        </div>
        <Formik
          onSubmit={formik.handleSubmit}
          initialValues={formik.initialValues}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form__registraition} action="">
              <Stack spacing={2}>
                <TextField
                  sx={{
                    m: 1,

                    backgroundColor: "rgb(249, 247, 247)",
                    border: "none",
                    borderRadius: "12px",
                  }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Введи адрес почты"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <TextField
                  sx={{
                    m: 1,

                    backgroundColor: "rgb(249, 247, 247)",
                    border: "none",
                    borderRadius: "12px",
                  }}
                  fullWidth
                  id="username"
                  name="username"
                  label="Придумай логин"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.values.username == "" // Только показывать ошибку, если поле не пустое
                  }
                />
                <FormControl
                  sx={{
                    m: 1,

                    backgroundColor: "rgb(249, 247, 247)",
                    border: "none",
                    borderRadius: "12px",
                  }}
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Создай пароль
                  </InputLabel>
                  <OutlinedInput
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <ErrorHandle
                  values={formik.values}
                  touched={formik.touched.password}
                />
                <FormControl
                  fullWidth
                  style={{
                    m: 1,

                    backgroundColor: "rgb(249, 247, 247)",
                    border: "none",
                    borderRadius: "12px",
                    marginTop: "22px",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Создай пароль
                  </InputLabel>
                  <OutlinedInput
                    value={formik.values.password_confirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password_confirm &&
                      Boolean(formik.errors.password_confirm)
                    }
                    id="password_confirm"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <PasswordConfirmItem values={formik.values} />
                <Button
                  style={{
                    marginTop: "24px",
                    backgroundColor: formik.isValid ? "black" : "lightgrey",
                    color: "grey",
                    height: "50px",
                    border: "none",
                  }}
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.form__button}
                  variant="contained"
                >
                  Далее
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
