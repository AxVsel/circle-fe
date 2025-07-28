// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import threadReducer from "./slice/threadSlice";
import likeReducer from "./slice/likeSliceThread";
import replyReducer from "./slice/replySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    like: likeReducer,
    replies: replyReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
