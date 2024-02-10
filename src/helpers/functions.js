import axios from "axios";
import { API } from "./const";

export const addDataToLocalStorage = (user, tokens) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

export const validatePassword = (values) => {
  const errors = {
    symbolsLengthError: { error: false, text: "от 8 до 15 символов" },
    capitalLetterError: { error: false, text: "строчные и прописные буквы" },
    numberRequired: { error: false, text: "минимум 1 цифра" },
    specialSymbolError: {
      error: false,
      text: "минимум 1 спецсимвол !, '', #, $...",
    },
  };

  // Проверка на от 8 до 15 символов
  if (values.password.length < 8 || values.password.length > 15) {
    errors.symbolsLengthError.error = true;
  }

  // Проверка на наличие строчных и прописных букв
  if (!/[a-z]/.test(values.password) || !/[A-Z]/.test(values.password)) {
    errors.capitalLetterError.error = true;
  }

  // Проверка на наличие хотя бы одной цифры
  if (!/\d/.test(values.password)) {
    errors.numberRequired.error = true;
  }

  // Проверка на наличие хотя бы одного спецсимвола
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    errors.specialSymbolError.error = true;
  }
  return errors;
};

export const updateToken = () => {
  console.log("WORK");
  let updateFunc = setInterval(async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (!tokens) return clearInterval(updateFunc);
    const Authorization = `Bearer ${tokens.access}`;
    let res = await axios.post(
      `${API}/login/refresh/`,
      { refresh: tokens.refresh },
      { headers: { Authorization } }
    );
    localStorage.setItem(
      "tokens",
      JSON.stringify({ refresh: tokens.refresh, access: res.data.access })
    );
  }, 1000 * 60 * 9);
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("tokens");
};
