// src/redux/slices/replySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance"; // pastikan path ini sesuai dengan proyekmu

interface User {
  id: number;
  username: string;
  photo_profile: string;
}

export interface Reply {
  id: number;
  content: string;
  created_at: string;
  thread_id: number;
  user_id: number;
  image: string | null;
  user: User;
}

interface ReplyState {
  data: {
    [threadId: number]: Reply[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: ReplyState = {
  data: {},
  loading: false,
  error: null,
};

export const fetchRepliesByThreadId = createAsyncThunk(
  "replies/fetchByThreadId",
  async (threadId: number) => {
    const res = await axios.get(`/reply/threads/${threadId}/replies`);
    // console.log("Response dari API:", res.data);
    return {
      threadId,
      replies: res.data.replies, // ambil array replies dari respon
    };
  }
);

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepliesByThreadId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRepliesByThreadId.fulfilled,
        (
          state,
          action: PayloadAction<{ threadId: number; replies: Reply[] }>
        ) => {
          const { threadId, replies } = action.payload;
          state.data[threadId] = replies;
          state.loading = false;
        }
      )
      .addCase(fetchRepliesByThreadId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat balasan.";
      });
  },
});

export default replySlice.reducer;
