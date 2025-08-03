import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

export interface UserState {
  photo_profile: string;
  full_name: string;
  username: string;
  bio?: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  photo_profile: "",
  full_name: "",
  username: "",
  bio: "",
  loading: false,
  error: null,
};

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/user/${userId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { userId, formData }: { userId: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/users/user/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.photo_profile = action.payload.photo_profile || "";
        state.full_name = action.payload.full_name;
        state.username = action.payload.username;
        state.bio = action.payload.bio;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.photo_profile = action.payload.photo_profile || "";
        state.full_name = action.payload.full_name;
        state.username = action.payload.username;
        state.bio = action.payload.bio;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
