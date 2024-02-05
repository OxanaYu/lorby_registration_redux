import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./loginForm/LoginForm";
import RegistrationForm from "./registration/RegistrationForm";

const AuthRootComponent = () => {
  const location = useLocation();

  return location.pathname === "/login" ? (
    <LoginForm />
  ) : location.pathname === "/register" ? (
    <RegistrationForm />
  ) : null;
};

export default AuthRootComponent;
