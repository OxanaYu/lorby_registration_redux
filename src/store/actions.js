import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../helpers/const";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userObj) => {
    console.log("`${API}/register/`", `${API}/register/`);
    let res = await axios.post(`${API}/register/`, {
      email: userObj.email,
      username: userObj.username,
      password: userObj.password,
      password_confirm: userObj.password_confirm,
    });

    console.log("res", res);

    console.log("res", res.status);
    console.log("res", res.statusText);

    return res;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (userObj) => {
  let res = await axios.post(`${API}/login/`, {
    username: userObj.username,
    password: userObj.password,
  });
  console.log("res after login", res);
  return { res, userObj };
});

export const checkUserEmail = createAsyncThunk(
  "user/email-confirm",
  async (confirmCode) => {
    try {
      let res = await axios.post(`${API}/email-confirm/`, {
        code: confirmCode,
      });
      return { res };
    } catch (err) {
      return {
        ...err,
        error: true,
      };
    }
  }
);
