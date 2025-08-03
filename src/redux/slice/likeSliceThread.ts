// src/redux/slice/likeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

interface LikeState {
  likedThreadIds: number[];
  likeCounts: { [threadId: number]: number };
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  likedThreadIds: [],
  likeCounts: {},
  loading: false,
  error: null,
};

export const toggleLikeThread = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("like/toggle", async (threadId, { rejectWithValue }) => {
  try {
    await axiosInstance.post(`/likes/threads/${threadId}`);
    return threadId;
  } catch (err: any) {
    return rejectWithValue("Gagal melakukan like");
  }
});

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikedThreadIds(state, action: PayloadAction<number[]>) {
      state.likedThreadIds = action.payload;
    },
    setLikeDataFromThreads(
      state,
      action: PayloadAction<
        { threadId: number; likeCount: number; isLiked: boolean }[]
      >
    ) {
      action.payload.forEach(({ threadId, likeCount, isLiked }) => {
        state.likeCounts[threadId] = likeCount;
        if (isLiked && !state.likedThreadIds.includes(threadId)) {
          state.likedThreadIds.push(threadId);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeThread.fulfilled, (state, action) => {
        const threadId = action.payload;
        const index = state.likedThreadIds.indexOf(threadId);
        const liked = index === -1;

        if (liked) {
          state.likedThreadIds.push(threadId);
        } else {
          state.likedThreadIds.splice(index, 1);
        }

        state.likeCounts[threadId] =
          (state.likeCounts[threadId] || 0) + (liked ? 1 : -1);
      })
      .addCase(toggleLikeThread.rejected, (state, action) => {
        state.error = action.payload || "Gagal melakukan like";
      });
  },
});

export const { setLikedThreadIds, setLikeDataFromThreads } = likeSlice.actions;
export default likeSlice.reducer;
