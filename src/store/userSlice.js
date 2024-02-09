import { createSlice } from "@reduxjs/toolkit";
import { addDataToLocalStorage } from "../helpers/functions";
import { registerUser, loginUser, checkUserEmail } from "./actions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    wrongCodeError: null,
    status: "",
  },
  reducers: {
    cleanErrorState: (state) => {
      state.error = null;
    },
    cleanStatusState: (state) => {
      state.status = "";
    },
    cleanUserState: (state) => {
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
        state.status = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false; // Ошибка возвращается с сервера
      })
      .addCase(loginUser.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "Success!";
        addDataToLocalStorage(action.payload.res.data);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(checkUserEmail.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserEmail.fulfilled, (state, action) => {
        console.log("action", action.payload);
        if (action.payload.error) {
          state.wrongCodeError = true;
        }
        state.loading = false;
      })
      .addCase(checkUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.wrongCodeError = true;
        console.log("reducer checkUserEmail called");
      });
  },
});

export const { cleanErrorState, cleanStatusState, cleanUserState } =
  userSlice.actions;
export default userSlice.reducer;
