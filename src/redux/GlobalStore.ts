// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import threadReducer from "./slice/threadSlice"; // tambahkan ini

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer, // tambahkan ini
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
