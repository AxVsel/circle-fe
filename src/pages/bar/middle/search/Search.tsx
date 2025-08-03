import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/GlobalStore";
import {
  searchUsers,
  followUser,
  unfollowUser,
  fetchFollowingsList,
} from "@/redux/slice/followSlice";
import useDebounce from "@/hooks/useDebounce";
import FollowAll from "../follows/FollowAll";
import userIcon from "@/assets/user.png";
import defaultAvatar from "@/assets/user.png";

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const searchedUsers = useSelector(
    (state: RootState) => state.follow.searchedUsers
  );
  const followingsList = useSelector(
    (state: RootState) => state.follow.followingsList
  );

  // Fetch followings saat pertama kali render (saat userId tersedia)
  useEffect(() => {
    if (userId) {
      dispatch(fetchFollowingsList(userId));
    }
  }, [userId, dispatch]);

  // Lakukan pencarian user berdasarkan keyword
  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      dispatch(searchUsers(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  // Cek apakah user sedang difollow
  const isUserFollowing = useCallback(
    (targetId: number) => followingsList.some((u) => u.id === targetId),
    [followingsList]
  );

  // Toggle follow/unfollow
  const handleFollowToggle = async (targetUserId: number) => {
    if (isUserFollowing(targetUserId)) {
      await dispatch(unfollowUser(targetUserId));
    } else {
      await dispatch(followUser(targetUserId));
    }

    // Refresh daftar followings
    if (userId) {
      dispatch(fetchFollowingsList(userId));
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-5">
      {/* Input search */}
      <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2 border border-green-600 focus-within:ring-2 focus-within:ring-green-600 transition-all duration-300">
        <img
          src={userIcon}
          alt="User Icon"
          className="w-5 h-5 mr-3 opacity-70"
        />
        <input
          type="text"
          placeholder="Search your friend"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent focus:outline-none text-white w-full placeholder:text-zinc-400"
        />
      </div>

      {/* Hasil pencarian */}
      <div className="mt-4 text-white text-sm space-y-2">
        {searchedUsers.map((user) => (
          <FollowAll
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
            authUserId={authUser?.id}
          />
        ))}
      </div>
    </div>
  );
}
