import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../helpers/const";
import { addDataToLocalStorage } from "../helpers/functions";
import { useNavigate } from "react-router-dom";

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
    console.log("confirmCode", confirmCode);
    let res = await axios.post(`${API}/email-confirm/`, { code: confirmCode });
    console.log("res after email confirm", res);
    return { res };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    status: "",
  },
  reducers: {
    cleanErrorState: (state, action) => {
      state.error = null;
    },
    cleanStatusState: (state, action) => {
      state.status = "";
    },
    cleanUserState: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.error.name;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userObj;
        state.status = "Success!";
        addDataToLocalStorage(
          action.payload.userObj.username,
          action.payload.res.data
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.name;
      });
  },
});

export const { cleanErrorState, cleanStatusState, cleanUserState } =
  userSlice.actions;
export default userSlice.reducer;
