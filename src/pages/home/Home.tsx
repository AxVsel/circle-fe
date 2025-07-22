import InputPost from "./InputPost";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreads, prependThread } from "../../redux/slice/threadSlice";
import type { AppDispatch, RootState } from "../../redux/GlobalStore";
import socket from "../services/socket";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { threads, loading, error } = useSelector(
    (state: RootState) => state.thread
  );

  useEffect(() => {
    dispatch(fetchThreads());
    // Saat menerima thread baru dari WebSocket
    socket.on("new-thread", (newThread) => {
      dispatch(prependThread(newThread)); // 👈 tambahkan ke awal
    });

    // Cleanup
    return () => {
      socket.off("new-thread");
    };
  }, [dispatch]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="mt-5">
        <h1 className="text-4xl text-white">Home</h1>
      </div>
      <div className="flex mt-5 bg-zinc-900 border-b-1 border-white">
        <InputPost />
      </div>
      <div className="w-full mx-auto px-4 mt-6">
        {threads.map((thread) => (
          <PostCard
            key={thread.id}
            username={thread.user.full_name}
            handle={thread.user.username}
            time={new Date(thread.timestamp).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            avatar={thread.user.photo_profile}
            content={thread.content}
            likes={thread.likes?.length || 0}
            comments={thread.comments?.length || 0}
            image={
              thread.image_url
                ? `http://localhost:2002/uploadThreads/${thread.image_url}` // prefix + path
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
