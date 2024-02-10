import React, { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes";
import Modal from "react-modal";

const App = () => {
  useEffect(() => {
    // Определение корневого элемента приложения для react-modal
    Modal.setAppElement("#root");

    // Функция, которая будет вызвана при размонтировании компонента App
    return () => {
      // Очистить корневой элемент приложения для react-modal при размонтировании компонента App
      Modal.setAppElement(null);
    };
  }, []);

  return (
    <div>
      <MainRoutes />
    </div>
  );
};

export default App;
