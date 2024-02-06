import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRootComponent from "../components/AuthRootComponent";
import MainPage from "../components/pages/MainPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<AuthRootComponent />} />
      <Route path="/login" element={<AuthRootComponent />} />
    </Routes>
  );
};

export default MainRoutes;
