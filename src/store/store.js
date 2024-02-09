import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  userSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
