// src/redux/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user_id: number | null;
  username: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  token: string | null;
}

const initialState: UserState = {
  user_id: null,
  username: null,
  name: null,
  email: null,
  avatar: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
