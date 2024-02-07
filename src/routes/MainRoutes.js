import React from "react";
import { Route, Routes } from "react-router-dom";

import ConfirmEmail from "../components/confirmEmail/ConfirmEmail";
import RegistrationForm from "../components/registration/RegistrationForm";
import LoginForm from "../components/loginForm/LoginForm";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
    </Routes>
  );
};

export default MainRoutes;
