import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { RootState } from "@/redux/GlobalStore";

import { useSelector } from "react-redux";

export default function ProfileCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Card className="bg-zinc-800 text-white shadow p-4 overflow-hidden w-5/6 mt-8">
      {/* Banner */}
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="h-24 rounded-t-xl overflow-hidden">
        {user?.background && (
          <img
            src={
              user.background.startsWith("http")
                ? user.background
                : `http://localhost:2002/${user.background}`
            }
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Avatar dan Edit */}
      <div className="relative px-4">
        <div className="w-16 h-16 rounded-full border-4 border-zinc-900 overflow-hidden absolute -top-8">
          {user?.photo_profile && (
            <img
              src={
                user.photo_profile.startsWith("http")
                  ? user.photo_profile
                  : `http://localhost:2002/${user.photo_profile}`
              }
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Tombol Edit */}
        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            className="text-white bg-zinc-900 border-white hover:bg-white/10 text-sm h-8"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <CardContent className="mt-2 pt-4">
        <div className="text-lg font-semibold">{user?.full_name}</div>
        <div className="text-sm text-zinc-400">@{user?.username}</div>
        <p className="text-sm mt-2 text-zinc-300">
          picked over by the worms, and weird fishes
        </p>

        {/* Followers */}
        <div className="flex gap-4 mt-3 text-sm text-zinc-400">
          <span>
            <strong className="text-white">291</strong> Following
          </span>
          <span>
            <strong className="text-white">23</strong> Followers
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
