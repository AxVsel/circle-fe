import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeThread } from "../../../../redux/slice/likeSliceThread";
import { fetchRepliesByThreadId } from "../../../../redux/slice/replySlice";

import type { AppDispatch, RootState } from "../../../../redux/GlobalStore";

import arrowLeft from "@/assets/arrow-left.png";
import heart from "@/assets/heart.png";
import heartFill from "@/assets/heart-fill.png";
import repliesIcon from "@/assets/replies.png";
import profileImage from "@/assets/profile.png";

import StatusInput from "./StatusInput";
import StatusCard from "./StatusCard";
import defaultAvatar from "@/assets/user.png";

export default function Status() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams();

  const thread = useSelector((state: RootState) =>
    state.thread.threads.find((t) => t.id === Number(threadId))
  );
  const { likeCounts, likedThreadIds } = useSelector(
    (state: RootState) => state.like
  );
  const replies = useSelector(
    (state: RootState) => state.replies.data[Number(threadId)] || []
  );
  const loading = useSelector((state: RootState) => state.replies.loading);

  useEffect(() => {
    if (threadId) {
      dispatch(fetchRepliesByThreadId(Number(threadId)));
    }
  }, [dispatch, threadId]);

  const handleToggleLike = (id: number) => {
    dispatch(toggleLikeThread(id));
  };

  if (!thread) {
    return (
      <div className="text-white p-4">
        Thread tidak ditemukan atau sedang dimuat...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <div
        className="mt-5 flex items-center gap-2 text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={arrowLeft} alt="Back" className="w-5 h-5" />
        <h1 className="text-2xl font-semibold">Status</h1>
      </div>

      {/* Thread Utama */}
      <div className="flex flex-col items-center w-full">
        <div className="p-4 text-white w-full ml-5">
          <div className="flex items-start gap-3">
            <img
              src={
                thread.user?.photo_profile?.startsWith("http")
                  ? thread.user.photo_profile
                  : thread.user?.photo_profile
                  ? `https://circle-be-production-6eed.up.railway.app/uploadUser/${thread.user.photo_profile}`
                  : defaultAvatar
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex flex-col">
                <span className="font-semibold">{thread.user.full_name}</span>
                <span className="text-sm text-zinc-400">
                  @{thread.user.username}
                </span>
              </div>
              <p className="mt-2 text-base leading-relaxed">{thread.content}</p>

              {thread.image_url && (
                <img
                  src={`https://circle-be-production-6eed.up.railway.app/uploadThreads/${thread.image_url}`}
                  alt="Thread Image"
                  className="mt-3 rounded-xl w-full max-w-md object-cover"
                />
              )}

              <div className="mt-3 text-sm text-zinc-400">
                {new Date(thread.timestamp).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                •{" "}
                {new Date(thread.timestamp).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="flex items-center gap-6 mt-2 text-sm text-zinc-400">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleToggleLike(thread.id)}
                >
                  <img
                    src={likedThreadIds.includes(thread.id) ? heartFill : heart}
                    alt="Likes"
                    className="w-4 h-4"
                  />
                  <span>{likeCounts[thread.id] ?? thread.like_count ?? 0}</span>
                </div>

                <div className="flex items-center gap-1">
                  <img src={repliesIcon} alt="Replies" className="w-4 h-4" />
                  <span>
                    {thread.number_of_replies || replies.length} Replies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Reply */}
      <div className="flex flex-col items-end">
        <div className="p-4 w-full ml-5">
          <StatusInput threadId={thread.id} />
        </div>
      </div>

      {/* Replies */}
      <div className="w-full mx-auto px-4 mt-6">
        {loading ? (
          <p className="text-white">Memuat balasan...</p>
        ) : replies.length === 0 ? (
          <p className="text-white">Belum ada balasan.</p>
        ) : (
          replies.map((reply) => (
            <StatusCard
              key={reply.id}
              username={reply.user.username}
              handle={reply.user.username}
              time={new Date(reply.created_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              avatar={
                reply.user?.photo_profile?.startsWith("http")
                  ? reply.user.photo_profile
                  : reply.user?.photo_profile
                  ? `https://circle-be-production-6eed.up.railway.app/uploadUser/${reply.user.photo_profile}`
                  : profileImage
              }
              content={reply.content}
              likes={0}
              comments={0}
              image={
                reply.image
                  ? `https://circle-be-production-6eed.up.railway.app/uploadReplys/${reply.image}`
                  : undefined
              }
              liked={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
