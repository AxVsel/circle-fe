import { Routes, Route } from "react-router-dom";
import Home from "./bar/middle/home/Home";
import Search from "./bar/middle/search/Search";
import Follows from "./bar/middle/follows/Follow";
import MyProfile from "./bar/middle/profile/MyProfile";
import Status from "./bar/middle/status/Status";
import NotFound from "./not/NotFound";
import LeftBarMenu from "./bar/left/LeftBarMenu";
import ProfileCard from "./bar/right/ProfileCard";

export default function GlobalBar() {
  return (
    <div className="flex h-dvh w-screen">
      <div className="bg-zinc-900 basis-[20%] p-2 space-y-2 border-r-1 border-white">
        <LeftBarMenu />
      </div>

      <div className="bg-zinc-900 basis-[50%] overflow-y-scroll">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follows" element={<Follows />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/threads/:threadId/replies" element={<Status />} />

          <Route
            path="*"
            element={
              <>
                {console.log("404 Page Rendered")}
                <NotFound />
              </>
            }
          />
        </Routes>
      </div>

      <div className="bg-zinc-900 basis-[30%] flex flex-col items-center gap-4">
        <ProfileCard />
      </div>
    </div>
  );
}
