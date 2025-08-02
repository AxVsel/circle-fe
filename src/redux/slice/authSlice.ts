// src/redux/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { updateUserProfile } from "./userSlice";

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  photo_profile?: string;
  background?: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        localStorage.setItem("user", JSON.stringify(state.user)); // simpan perubahan
      }
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
