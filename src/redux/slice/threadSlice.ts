// src/redux/slices/threadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

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
  like_count: number; // <== tambahkan ini
  is_liked: boolean;
  number_of_replies: number | null;
  timestamp: string;
  user: User;
}

// Tambahkan tipe parameter
interface FetchThreadsArgs {
  offset: number;
  limit: number;
}

// Tipe untuk state Redux
interface ThreadState {
  threads: Thread[];
  selectedThread: Thread | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  offset: number;
}

const initialState: ThreadState = {
  threads: [],
  selectedThread: null,
  loading: false,
  error: null,
  hasMore: true,
  offset: 0,
};

// Fetch threads dari backend
export const fetchThreads = createAsyncThunk<Thread[], FetchThreadsArgs>(
  "thread/fetchThreads",
  async ({ offset, limit }) => {
    const res = await axios.get("/thread/threads", {
      params: { offset, limit },
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
      state.threads.unshift(action.payload);
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

        const newThreads = action.payload.filter(
          (thread) => !state.threads.some((t) => t.id === thread.id)
        );

        state.threads.push(...newThreads);
        state.offset += newThreads.length;

        if (newThreads.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat thread";
      });
  },
});

export const { prependThread } = threadSlice.actions;
export default threadSlice.reducer;
