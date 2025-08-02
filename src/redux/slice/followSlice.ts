// src/redux/followSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

interface FollowUser {
  id: number;
  username: string;
  full_name: string;
  bio?: string;
  photo_profile?: string;
}

interface FollowState {
  isFollowing: boolean;
  followingsCount: number;
  followersCount: number;
  followersList: FollowUser[];
  followingsList: FollowUser[];
  searchedUsers: FollowUser[];

  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  isFollowing: false,
  followingsCount: 0,
  followersCount: 0,
  followersList: [],
  followingsList: [],
  searchedUsers: [],
  loading: false,
  error: null,
};

export const searchUsers = createAsyncThunk(
  "follow/searchUsers",
  async (searchTerm: string) => {
    const res = await axios.get(
      `/follows/users/follow-data?search=${searchTerm}`
    );
    return res.data.data.map((user: any) => ({
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      bio: user.bio,
      photo_profile: user.photo_profile,
    }));
  }
);

// Cek status follow
export const fetchFollowStatus = createAsyncThunk(
  "follow/fetchStatus",
  async (userId: number) => {
    const res = await axios.get(`/follows/is-following/${userId}`);
    return res.data.isFollowing as boolean;
  }
);

// Follow user
export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId: number) => {
    await axios.post(
      `/follows/follow`,
      { following_id: userId },
      { withCredentials: true }
    );
    return userId; // <- ini penting agar slice tahu siapa yang difollow
  }
);

// Unfollow user
export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId: number) => {
    await axios.post(
      `/follows/unfollow`,
      { following_id: userId },
      { withCredentials: true }
    );
    return userId; // <- ini juga
  }
);

// Get jumlah followers & followings
export const fetchFollowCounts = createAsyncThunk(
  "follow/fetchCounts",
  async (userId: number) => {
    const res = await axios.get(`/follows/follow/counts/${userId}`);
    return {
      followings: res.data.followingsCount,
      followers: res.data.followersCount,
    };
  }
);

// Fetch daftar followers
export const fetchFollowersList = createAsyncThunk(
  "follow/fetchFollowersList",
  async (userId: number) => {
    const res = await axios.get(`/follows/followers/${userId}`, {
      withCredentials: true,
    });

    return res.data.map((item: any) => ({
      id: item.follower.id,
      username: item.follower.username,
      full_name: item.follower.full_name,
      bio: item.follower.bio,
      image: item.follower.image,
    }));
  }
);

// Fetch daftar followings
export const fetchFollowingsList = createAsyncThunk(
  "follow/fetchFollowingsList",
  async (userId: number) => {
    const res = await axios.get(`/follows/followings/${userId}`, {
      withCredentials: true,
    });

    return res.data.map((item: any) => ({
      id: item.following.id,
      username: item.following.username,
      full_name: item.following.full_name,
      bio: item.following.bio,
      image: item.following.image,
    }));
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowStatus.fulfilled, (state, action) => {
        state.isFollowing = action.payload;
        state.loading = false;
      })
      .addCase(fetchFollowStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to check follow status.";
      })

      .addCase(followUser.fulfilled, (state) => {
        state.isFollowing = true;
        state.followersCount += 1;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to follow user.";
      })

      .addCase(unfollowUser.fulfilled, (state) => {
        state.isFollowing = false;
        state.followersCount -= 1;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to unfollow user.";
      })

      .addCase(fetchFollowCounts.fulfilled, (state, action) => {
        state.followersCount = action.payload.followers;
        state.followingsCount = action.payload.followings;
      })

      .addCase(fetchFollowersList.fulfilled, (state, action) => {
        state.followersList = action.payload;
      })

      .addCase(fetchFollowingsList.fulfilled, (state, action) => {
        state.followingsList = action.payload;
      })
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchedUsers = action.payload;
        state.loading = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Failed to search users.";
        state.loading = false;
      });
  },
});

export default followSlice.reducer;
