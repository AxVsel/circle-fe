// MyProfile.tsx
import { useNavigate } from "react-router-dom";
import arrowLeft from "@/assets/arrow-left.png";
import { useState, useEffect } from "react";
import type { RootState, AppDispatch } from "@/redux/GlobalStore";
import { useSelector, useDispatch } from "react-redux";
import { fetchFollowCounts } from "@/redux/slice/followSlice";
import ThreadCard from "@/pages/bar/middle/home/ThreadCard";
import {
  fetchMyThreads,
  fetchMyMediaThreads,
} from "@/redux/slice/userThreadSlice";
import { toggleLikeThread } from "@/redux/slice/likeSliceThread";
import profileImage from "@/assets/profile.png";

export default function MyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"posts" | "media">("posts");

  const user = useSelector((state: RootState) => state.auth.user);
  const followersCount = useSelector(
    (state: RootState) => state.follow.followersCount
  );
  const followingsCount = useSelector(
    (state: RootState) => state.follow.followingsCount
  );

  const { posts, media, loading, error } = useSelector(
    (state: RootState) => state.userThreads
  );

  // like state dari Redux
  const likedThreadIds = useSelector(
    (state: RootState) => state.like.likedThreadIds
  );
  const likeCounts = useSelector((state: RootState) => state.like.likeCounts);

  useEffect(() => {
    if (user) {
      dispatch(fetchFollowCounts(user.id));
      dispatch(fetchMyThreads({ offset: 0, limit: 10 }));
      dispatch(fetchMyMediaThreads({ offset: 0, limit: 10 }));
    }
  }, [dispatch, user]);

  const handleToggleLike = (id: number) => {
    dispatch(toggleLikeThread(id));
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      {/* Header */}
      <div
        className="mt-5 flex items-center gap-2 text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={arrowLeft} alt="Back" className="w-5 h-5" />
        <h1 className="text-2xl font-semibold">{user?.full_name}</h1>
      </div>

      {/* Profile Card */}
      <div className=" text-white rounded-lg overflow-hidden shadow-lg">
        {/* Cover */}
        <div className="h-44 rounded-t-xl overflow-hidden">
          {user?.background && (
            <img
              src={
                user.background.startsWith("http")
                  ? user.background
                  : `http://localhost:2002/uploadBackground/${user.background}`
              }
              alt="Cover"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Avatar & Info */}
        <div className="p-4 relative">
          <div className="w-20 h-20 rounded-full border-4 border-zinc-900 overflow-hidden absolute -top-8">
            {user?.photo_profile && (
              <img
                src={
                  user.photo_profile.startsWith("http")
                    ? user.photo_profile
                    : `http://localhost:2002/uploadUser/${user.photo_profile}`
                }
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div className="ml-24">
            <h2 className="text-lg font-bold">{user?.full_name}</h2>
            <p className="text-gray-400 text-sm">@{user?.username}</p>
            <p className="text-sm mt-1 text-gray-300">
              {user?.bio?.trim()
                ? user.bio
                : "picked over by the worms, and weird fishes"}
            </p>
          </div>

          {/* Follow button */}
          <div className="absolute top-2 right-4">
            <button className="px-4 py-1 rounded-full border border-gray-400 text-sm hover:bg-gray-800">
              Follow
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 px-4 pb-2">
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-white">{followingsCount}</span>{" "}
            Following
          </span>
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-white">{followersCount}</span>{" "}
            Followers
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-700 mt-2">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "posts"
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            All Post
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "media"
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading && <p className="text-gray-400">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {activeTab === "posts" && (
            <div className="space-y-3">
              {posts.length === 0 && (
                <p className="text-gray-400">No posts yet</p>
              )}
              {posts.map((post) => {
                const likes = likeCounts[post.id] ?? post.likeCount ?? 0;
                const liked = likedThreadIds.includes(post.id);
                console.log("Post image:", post.image);
                return (
                  <ThreadCard
                    key={post.id}
                    username={post.user.full_name}
                    handle={post.user.username}
                    time={new Date(post.created_at).toLocaleString()}
                    avatar={
                      post.user?.photo_profile?.startsWith("http")
                        ? post.user.photo_profile
                        : post.user?.photo_profile
                        ? `http://localhost:2002/uploadUser/${post.user.photo_profile}`
                        : profileImage
                    }
                    content={post.content}
                    likes={likes}
                    comments={0}
                    image={
                      post.image
                        ? `http://localhost:2002/uploadThreads/${post.image}`
                        : undefined
                    }
                    liked={liked}
                    onClickLike={() => handleToggleLike(post.id)}
                    onClickReply={() => navigate(`/threads/${post.id}/replies`)}
                  />
                );
              })}
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-2">
              {media.length === 0 && (
                <p className="text-gray-400 col-span-3">No media yet</p>
              )}
              {media.map((post, index) => (
                <img
                  key={index}
                  src={
                    post.image
                      ? `http://localhost:2002/uploadThreads/${post.image}`
                      : undefined
                  }
                  alt={`media-${index}`}
                  className="rounded-lg object-cover w-full h-auto cursor-pointer"
                  onClick={() => navigate(`/threads/${post.id}/replies`)} // ✅ pakai onClick
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
