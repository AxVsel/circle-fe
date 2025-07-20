import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LeftBarButton from "./LeftBarButton";
import PostDialog from "../dialog/DialogPost";
import { Button } from "@/components/ui/button";

// Icons
import circleIcon from "../../assets/logo.png";
import homeIcon from "../../assets/home.png";
import userIcon from "../../assets/user.png";
import followsIcon from "../../assets/follow.png";
import profileIcon from "../../assets/profile.png";
import homeFill from "../../assets/home-fill.png";
import userFill from "../../assets/user-fill.png";
import followFill from "../../assets/follow-fill.png";
import profileFill from "../../assets/profile-fill.png";

export default function LeftBarMenu() {
  return (
    <div className="flex flex-col h-full justify-between p-4 bg-zinc-900">
      <div className="flex flex-col gap-3 ">
        <div className="mb-6">
          <img src={circleIcon} alt="Logo" className="w-auto h-10" />
        </div>
        <LeftBarButton
          to="/"
          label="Home"
          icon={homeIcon}
          iconFill={homeFill}
          currentPath={location.pathname}
        />
        <LeftBarButton
          to="/search"
          label="Search"
          icon={userIcon}
          iconFill={userFill}
          currentPath={location.pathname}
        />
        <LeftBarButton
          to="/follows"
          label="Follows"
          icon={followsIcon}
          iconFill={followFill}
          currentPath={location.pathname}
        />
        <LeftBarButton
          to="/profile"
          label="Profile"
          icon={profileIcon}
          iconFill={profileFill}
          currentPath={location.pathname}
        />
        <div className="w-full mt-4">
          <PostDialog />
        </div>
      </div>
      <div className="mt-auto pt-4"></div>
    </div>
  );
}
