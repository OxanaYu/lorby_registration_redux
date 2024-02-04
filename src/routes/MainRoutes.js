import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/loginForm/LoginForm";
import RegistrationForm from "../components/registration/RegistrationForm";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/auth" element={<RegistrationForm />} />
    </Routes>
  );
};

export default MainRoutes;
