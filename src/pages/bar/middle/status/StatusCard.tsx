import { useState } from "react";
import heart from "@/assets/heart.png";
import heartFill from "@/assets/heart-fill.png";
import repliesIcon from "@/assets/replies.png";

interface Reply {
  id: number;
  content: string;
  username: string;
  handle: string;
  time: string;
}

interface PostCardProps {
  username: string;
  handle: string;
  time: string;
  avatar: string;
  content: string;
  comments: number;
  likes: number; // ✅ ditambahkan
  liked?: boolean;
  image?: string;
}

export default function StatusCard({
  username,
  handle,
  time,
  avatar,
  content,
  comments,
  likes,
  liked = false,
  image,
}: PostCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 1,
      content: "Semangat ya! Kadang semesta cuma lagi nguji.",
      username: "orangbaik",
      handle: "healingdaily",
      time: "2h",
    },
  ]);

  const handleAddReply = () => {
    if (replyInput.trim() === "") return;
    const newReply: Reply = {
      id: Date.now(),
      content: replyInput,
      username: "you", // Ganti dengan user login nantinya
      handle: "yourhandle",
      time: "now",
    };
    setReplies((prev) => [...prev, newReply]);
    setReplyInput("");
  };

  return (
    <div className="flex gap-3 py-4 px-4 border-b border-zinc-800">
      <img
        src={avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-x-1 text-sm text-white">
          <span className="font-semibold">{username}</span>
          <span className="text-zinc-400">@{handle}</span>
          <span className="text-zinc-400">• {time}</span>
        </div>

        <p className="text-white mt-1 text-sm whitespace-pre-line leading-relaxed">
          {content}
        </p>

        {image && (
          <img
            src={image}
            alt="post"
            className="mt-3 rounded-xl w-full max-w-[500px] object-cover"
          />
        )}

        {/* Reactions */}
        <div className="flex items-center gap-6 mt-2 text-zinc-400 text-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <img
              src={liked ? heartFill : heart}
              alt="like"
              className="w-4 h-4"
            />
            {likes}
          </div>

          <div
            className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            <img src={repliesIcon} alt="replies" className="w-4 h-4" />
            <span>{comments} Replies</span>
          </div>
        </div>

        {/* Replies Section */}
        {showReplies && (
          <div className="mt-4 space-y-3">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-2 text-sm text-white">
                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {reply.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <span className="font-semibold text-white">
                      {reply.username}
                    </span>
                    <span>@{reply.handle}</span>
                    <span>• {reply.time}</span>
                  </div>
                  <p className="text-white">{reply.content}</p>
                </div>

                {/* Tombol Hapus jika milik user sendiri */}
                {reply.username === "you" && (
                  <button
                    className="text-red-500 text-xs hover:underline"
                    onClick={() => {
                      setReplies((prev) =>
                        prev.filter((r) => r.id !== reply.id)
                      );
                    }}
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}

            {/* Reply Input */}
            <div className="flex gap-2 mt-2">
              <textarea
                className="flex-1 bg-zinc-900 text-white text-sm p-2 rounded resize-none border border-zinc-700"
                placeholder="Tulis balasan..."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
              />
              <button
                className="bg-blue-600 px-3 py-1 rounded text-white text-sm hover:bg-blue-700"
                onClick={handleAddReply}
              >
                Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
