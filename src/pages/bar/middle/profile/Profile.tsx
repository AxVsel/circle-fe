import { useNavigate } from "react-router-dom";
import arrowLeft from "@/assets/arrow-left.png";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "media">("posts");
  return (
    <>
      <div className="flex flex-col gap-2 p-3">
        <div
          className="mt-5 flex items-center gap-2 text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={arrowLeft} alt="Back" className="w-5 h-5" />
          <h1 className="text-2xl font-semibold">User Name</h1>
        </div>
        <div className=" text-white rounded-lg overflow-hidden shadow-lg">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-red-600 to-orange-500"></div>

          {/* Avatar & Info */}
          <div className="p-4 relative">
            {/* Avatar */}
            <div className="absolute -top-10 left-4">
              <img
                src="https://via.placeholder.com/80"
                alt="avatar"
                className="w-20 h-20 rounded-full border-4 border-black"
              />
            </div>

            <div className="ml-24">
              <h2 className="text-lg font-bold">Naveen Singh</h2>
              <p className="text-gray-400 text-sm">@naveeeen</p>
              <p className="text-sm mt-1 text-gray-300">
                Political Consultant | Veer Bhogya Vasundhara | Patriot |
                E-Majdoor | Political Observer
              </p>
            </div>

            {/* Follow button */}
            <div className="absolute top-2 right-4">
              <button className="px-4 py-1 rounded-full border border-gray-400 text-sm hover:bg-gray-800">
                Follow
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 px-4 pb-2">
            <span className="text-sm text-gray-300">
              <span className="font-semibold text-white">291</span> Following
            </span>
            <span className="text-sm text-gray-300">
              <span className="font-semibold text-white">23</span> Followers
            </span>
          </div>

          {/* Tabs */}
          <div className="flex border-t border-gray-700 mt-2">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "posts"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              All Post
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "media"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("media")}
            >
              Media
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === "posts" && (
              <div className="space-y-3">
                <div className="p-3 border border-gray-700 rounded-lg">
                  📌 Post pertama dari user
                </div>
                <div className="p-3 border border-gray-700 rounded-lg">
                  📌 Post kedua dari user
                </div>
                <div className="p-3 border border-gray-700 rounded-lg">
                  📌 Post ketiga dari user
                </div>
              </div>
            )}

            {activeTab === "media" && (
              <div className="grid grid-cols-3 gap-2">
                <img
                  src="https://via.placeholder.com/100"
                  alt="media1"
                  className="rounded-lg"
                />
                <img
                  src="https://via.placeholder.com/100"
                  alt="media2"
                  className="rounded-lg"
                />
                <img
                  src="https://via.placeholder.com/100"
                  alt="media3"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
