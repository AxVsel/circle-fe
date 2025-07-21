import heart from "@/assets/heart.png";
import heartFill from "@/assets/heart-fill.png";
import replies from "@/assets/replies.png";

interface PostCardProps {
  username: string;
  handle: string;
  time: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
  liked?: boolean;
}

export default function PostCard({
  username,
  handle,
  time,
  avatar,
  content,
  likes,
  comments,
  image,
  liked = false,
}: PostCardProps) {
  return (
    <div className="flex gap-3 py-4 border-b border-zinc-800">
      {/* Avatar */}
      <img
        src={avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Post Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-1 text-sm text-white">
          <span className="font-semibold">{username}</span>
          <span className="text-zinc-400">@{handle}</span>
          <span className="text-zinc-400">• {time}</span>
        </div>

        {/* Body */}
        <p className="text-white mt-1 text-sm whitespace-pre-line">{content}</p>

        {/* Optional Image */}
        {image && (
          <img
            src={image}
            alt="post"
            className="mt-3 rounded-lg w-full max-w-[500px] object-cover"
          />
        )}

        {/* Reactions */}
        <div className="flex items-center gap-6 mt-2 text-zinc-400 text-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            <img
              src={liked ? heartFill : heart}
              alt="like"
              className="w-4 h-4"
            />
            {likes}
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            <img src={replies} alt="replies" className="w-4 h-4" />
            {comments} Replies
          </div>
        </div>
      </div>
    </div>
  );
}
