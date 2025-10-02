// src/redux/slice/userThreadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/services/axiosInstance";
interface Thread {
  id: number;
  content: string;
  image?: string | null;
  created_at: string;
  likeCount: number;
  isLiked: boolean;
  user: {
    id: number;
    username: string;
    full_name: string;
    photo_profile?: string;
  };
}

interface UserThreadState {
  posts: Thread[];
  media: Thread[];
  loading: boolean;
  error: string | null;
}

const initialState: UserThreadState = {
  posts: [],
  media: [],
  loading: false,
  error: null,
};

// Ambil semua post user login
export const fetchMyThreads = createAsyncThunk<
  Thread[],
  { offset?: number; limit?: number }
>(
  "userThreads/fetchMyThreads",
  async ({ offset = 0, limit = 10 }, thunkAPI) => {
    try {
      const res = await axios.get(`/users/my?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch threads"
      );
    }
  }
);

// Ambil hanya media (thread dengan gambar)
export const fetchMyMediaThreads = createAsyncThunk<
  Thread[],
  { offset?: number; limit?: number }
>(
  "userThreads/fetchMyMediaThreads",
  async ({ offset = 0, limit = 10 }, thunkAPI) => {
    try {
      const res = await axios.get(
        `/users/my/media?offset=${offset}&limit=${limit}`,
        { withCredentials: true }
      );
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch media threads"
      );
    }
  }
);

const userThreadSlice = createSlice({
  name: "userThreads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All posts
      .addCase(fetchMyThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchMyThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Media
      .addCase(fetchMyMediaThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyMediaThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.media = action.payload;
      })
      .addCase(fetchMyMediaThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userThreadSlice.reducer;
