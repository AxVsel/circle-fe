// src/pages/Follow.tsx
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowersList,
  fetchFollowingsList,
  followUser,
  unfollowUser,
} from "../../../../redux/slice/followSlice";
import type { RootState, AppDispatch } from "../../../../redux/GlobalStore";
import Followers from "./Followers";
import Followings from "./Followings";
import defaultAvatar from "@/assets/user.png";

export default function Follow() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const followersList = useSelector(
    (state: RootState) => state.follow.followersList
  );
  const followingsList = useSelector(
    (state: RootState) => state.follow.followingsList
  );
  const loading = useSelector((state: RootState) => state.follow.loading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFollowersList(userId));
      dispatch(fetchFollowingsList(userId));
    }
  }, [dispatch, userId]);
  // Mengecek apakah user sudah di-follow
  const isUserFollowing = useCallback(
    (userIdToCheck: number) => {
      return followingsList.some((user) => user.id === userIdToCheck);
    },
    [followingsList]
  );

  // Follow / Unfollow handler
  const handleFollowToggle = async (targetUserId: number) => {
    if (isUserFollowing(targetUserId)) {
      await dispatch(unfollowUser(targetUserId));
    } else {
      await dispatch(followUser(targetUserId));
    }

    // Refresh daftar agar tampilan berubah
    if (userId) {
      dispatch(fetchFollowersList(userId));
      dispatch(fetchFollowingsList(userId));
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="text-2xl text-white font-semibold mt-5">Follows</h1>

      <div className="w-full mt-4">
        {/* Tab navigation */}
        <div className="flex justify-around">
          <button
            className={`py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === "followers" ? "text-white" : "text-zinc-400"
            }`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          <button
            className={`py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === "following" ? "text-white" : "text-zinc-400"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        {/* Garis aktif */}
        <div className="relative h-1 bg-zinc-800">
          <div
            className="absolute bottom-0 left-0 h-1 bg-green-600 transition-all duration-300"
            style={{
              width: "50%",
              transform:
                activeTab === "following"
                  ? "translateX(100%)"
                  : "translateX(0%)",
            }}
          />
        </div>

        {/* Daftar followers / followings */}
        <div className="mt-4 text-white text-sm space-y-2">
          {loading && <p>Loading...</p>}

          {!loading &&
            activeTab === "followers" &&
            followersList.map((user) => (
              <Followers
                id={user.id}
                key={user.id}
                full_name={user.full_name}
                username={user.username}
                bio={user.bio ?? ""}
                image={
                  user?.photo_profile?.startsWith("http")
                    ? user.photo_profile
                    : user?.photo_profile
                    ? `https://circle-be-production-6eed.up.railway.app/uploadUser/${user.photo_profile}`
                    : defaultAvatar
                }
                isFollowing={isUserFollowing(user.id)}
                onFollowToggle={() => handleFollowToggle(user.id)}
              />
            ))}

          {!loading &&
            activeTab === "following" &&
            followingsList.map((user) => (
              <Followings
                id={user.id}
                key={user.id}
                full_name={user.full_name}
                username={user.username}
                bio={user.bio ?? ""}
                image={
                  user?.photo_profile?.startsWith("http")
                    ? user.photo_profile
                    : user?.photo_profile
                    ? `https://circle-be-production-6eed.up.railway.app/uploadUser/${user.photo_profile}`
                    : defaultAvatar
                }
                isFollowing={true}
                onFollowToggle={() => handleFollowToggle(user.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
