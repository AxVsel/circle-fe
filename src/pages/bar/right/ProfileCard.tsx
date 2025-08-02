import { Card, CardContent } from "@/components/ui/card";
import type { RootState, AppDispatch } from "@/redux/GlobalStore";
import { useSelector, useDispatch } from "react-redux";
import { fetchFollowCounts } from "../../../redux/slice/followSlice";
import EditProfileDialog from "./EditButtonProfile";
import { useEffect } from "react";

export default function ProfileCard() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const followersCount = useSelector(
    (state: RootState) => state.follow.followersCount
  );
  const followingsCount = useSelector(
    (state: RootState) => state.follow.followingsCount
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchFollowCounts(user.id));
    }
  }, [dispatch, user]);

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
                : `http://localhost:2002/uploadBackground/${user.background}`
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
                  : `http://localhost:2002/uploadUser/${user.photo_profile}`
              }
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Tombol Edit */}
        <div className="flex justify-end pt-2">
          {user && <EditProfileDialog user={user} />}
        </div>
      </div>

      {/* Profile Info */}
      <CardContent className="mt-2 pt-4">
        <div className="text-lg font-semibold">{user?.full_name}</div>
        <div className="text-sm text-zinc-400">@{user?.username}</div>
        <p className="text-sm mt-2 text-zinc-300">
          {user?.bio?.trim()
            ? user.bio
            : "picked over by the worms, and weird fishes"}
        </p>

        {/* Followers */}
        <div className="flex gap-4 mt-3 text-sm text-zinc-400">
          <span>
            <strong className="text-white">{followingsCount}</strong> Following
          </span>
          <span>
            <strong className="text-white">{followersCount}</strong> Followers
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
