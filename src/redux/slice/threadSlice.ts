// src/redux/slices/threadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosMod from "../../services/axiosInstance"; // pastikan path ini sesuai dengan proyekmu
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

// // Tambahkan ini di bawah fetchThreads
// export const fetchThreadById = createAsyncThunk<Thread, number>(
//   "thread/fetchThreadById",
//   async (threadId) => {
//     const res = await axiosMod.get(
//       `http://localhost:2002/api/v1/reply/threads/${threadId}/replies`
//     );
//     return res.data.data.thread; // pastikan sesuai dengan struktur respons backend-mu
//   }
// );

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
      // .addCase(fetchThreadById.fulfilled, (state, action) => {
      //   console.log("Thread fetched successfully:", action.payload); // debug
      //   state.loading = false;
      //   const exists = state.threads.find((t) => t.id === action.payload.id);
      //   if (!exists) {
      //     state.threads.push(action.payload);
      //   }
      // })

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
