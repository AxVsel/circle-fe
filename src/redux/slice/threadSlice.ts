// src/redux/slices/threadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Tipe untuk user di dalam thread
interface User {
  id: number;
  name: string;
  full_name: string;
  username: string;
  photo_profile: string;
}

// Tipe untuk satu thread
export interface Thread {
  id: number;
  user_id: number;
  content: string;
  image_url: string | null;
  likes: string | null;
  comments: string | null;
  timestamp: string;
  user: User;
}

// Tipe untuk state Redux
interface ThreadState {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const initialState: ThreadState = {
  threads: [],
  loading: false,
  error: null,
};

// Fetch threads dari backend
export const fetchThreads = createAsyncThunk<Thread[]>(
  "thread/fetchThreads",
  async () => {
    const res = await axios.get("http://localhost:2002/api/v1/auth/thread", {
      withCredentials: true,
    });
    return res.data.data.tweet;
  }
);

// Slice Redux
const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    prependThread: (state, action) => {
      state.threads.unshift(action.payload); // tambahkan ke depan
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat thread";
      });
  },
});

export const { prependThread } = threadSlice.actions;
export default threadSlice.reducer;
