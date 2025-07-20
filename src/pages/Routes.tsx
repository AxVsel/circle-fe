import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Follows from "../pages/follows/Follow";
import Profile from "../pages/profile/Profile";
import NotFound from "./not/NotFound";

import LeftBarMenu from "./bar/LeftBarMenu";

export default function Bar() {
  return (
    <div className="flex h-dvh w-screen">
      <div className="bg-zinc-900 basis-[20%] p-2 space-y-2 border-r-1 border-white">
        <LeftBarMenu />
      </div>

      <div className="bg-zinc-900 basis-[50%] overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follows" element={<Follows />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <div className="bg-green-500 basis-[30%]">3</div>
    </div>
  );
}
