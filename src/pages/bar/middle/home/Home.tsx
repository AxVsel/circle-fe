import InputPost from "./ThreadInput";
import ThreadCard from "./ThreadCard";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchThreads,
  prependThread,
} from "../../../../redux/slice/threadSlice";
import {
  setLikeDataFromThreads,
  toggleLikeThread,
} from "../../../../redux/slice/likeSliceThread";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../redux/GlobalStore";
import socket from "../../../../services/socket";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const observer = useRef<IntersectionObserver | null>(null);

  const { threads, loading, error } = useSelector(
    (state: RootState) => state.thread
  );
  const { likeCounts, likedThreadIds } = useSelector(
    (state: RootState) => state.like
  );

  const lastThreadRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchThreads({ offset: offset + limit, limit }))
            .unwrap()
            .then((newData) => {
              if (newData.length < limit) setHasMore(false);
              setOffset((prev) => prev + limit);

              // Ambil dan simpan data like dari newData
              const likeData = newData.map((thread) => ({
                threadId: thread.id,
                likeCount: thread.like_count,
                isLiked: thread.is_liked,
              }));
              dispatch(setLikeDataFromThreads(likeData));
            });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, offset, dispatch]
  );

  const handleToggleLike = (threadId: number) => {
    dispatch(toggleLikeThread(threadId));
  };

  useEffect(() => {
    dispatch(fetchThreads({ offset: 0, limit }))
      .unwrap()
      .then((data) => {
        if (data.length < limit) setHasMore(false);

        // Ambil dan simpan like dari data awal
        const likeData = data.map((thread) => ({
          threadId: thread.id,
          likeCount: thread.like_count,
          isLiked: thread.is_liked,
        }));
        dispatch(setLikeDataFromThreads(likeData));
      });

    // Socket untuk thread baru
    socket.on("new-thread", (newThread) => {
      dispatch(prependThread(newThread));
      toast.success(
        `Thread baru dari ${newThread.user.full_name}: ` +
          newThread.content.slice(0, 100) +
          (newThread.content.length > 100 ? "..." : "")
      );
    });

    return () => {
      socket.off("new-thread");
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="mt-5">
        <h1 className="text-2xl text-white font-semibold">Home</h1>
      </div>

      <div className="flex mt-5 bg-zinc-900 border-b-1 border-white">
        <InputPost />
      </div>

      <div className="w-full mx-auto px-4 mt-6">
        {error && <p className="text-red-500">{error}</p>}

        {threads.map((thread, index) => {
          const isLast = index === threads.length - 1;
          return (
            <div key={thread.id} ref={isLast ? lastThreadRef : null}>
              <ThreadCard
                username={thread.user.full_name}
                handle={thread.user.username}
                time={new Date(thread.timestamp).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                avatar={
                  thread.user.photo_profile?.startsWith("http")
                    ? thread.user.photo_profile // Sudah berupa URL dicebear
                    : `http://localhost:2002/uploadUser/${thread.user.photo_profile}` // Gambar hasil upload
                }
                content={thread.content}
                likes={likeCounts[thread.id] ?? thread.like_count ?? 0}
                liked={likedThreadIds.includes(thread.id)}
                comments={thread.number_of_replies || 0}
                image={
                  thread.image_url
                    ? `http://localhost:2002/uploadThreads/${thread.image_url}`
                    : undefined
                }
                onClickReply={() => navigate(`/threads/${thread.id}/replies`)}
                onClickLike={() => handleToggleLike(thread.id)}
              />
            </div>
          );
        })}
      </div>

      {loading && <div className="w-full mx-auto px-4 mt-6">Loading</div>}

      {!loading && threads.length === 0 && (
        <p className="text-white text-center mt-4">Belum ada thread.</p>
      )}
    </div>
  );
}
