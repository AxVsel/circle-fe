import { Button } from "@/components/ui/button";

interface FollowCardProps {
  id: number;
  full_name: string;
  username: string;
  bio: string;
  image?: string;
  isFollowing: boolean;
  onFollowToggle: (id: number) => void;
}

export default function Followers({
  id,
  full_name,
  username,
  bio,
  image,
  isFollowing,
  onFollowToggle,
}: FollowCardProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-zinc-800 transition">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={full_name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-sm">
          <p className="font-semibold text-white">{full_name}</p>
          <p className="text-zinc-400">@{username}</p>
          <p className="text-zinc-300 text-xs">{bio}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className={`rounded-full px-4 py-1 text-sm border transition-colors duration-200 ${
          isFollowing
            ? "bg-zinc-700 text-white border-white hover:bg-zinc-600"
            : "bg-white text-zinc-950 border-white hover:bg-green-600 hover:text-white"
        }`}
        onClick={() => onFollowToggle(id)}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}
