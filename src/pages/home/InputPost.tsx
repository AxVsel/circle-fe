import { useState } from "react";
import { Button } from "@/components/ui/button";
import galleryIcon from "@/assets/gallery-add.png";
import toast from "react-hot-toast";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { fetchThreads } from "../../redux/slice/threadSlice"; // pastikan path benar
import type { AppDispatch } from "@/redux/GlobalStore";
import type { RootState } from "@/redux/GlobalStore";

export default function InputPost() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePost = async () => {
    if (!text.trim() && !file) {
      toast.error("Isi konten atau unggah gambar terlebih dahulu.");
      return;
    }
    const formData = new FormData();
    formData.append("content", text);
    if (file) {
      formData.append("image", file);
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:2002/api/v1/auth/thread", formData, {
        withCredentials: true,
      });

      dispatch(fetchThreads());

      toast.success("Postingan berhasil ditambahkan!");

      // Reset form
      setText("");
      setImagePreview(null);
      setFile(null);
    } catch (err) {
      console.error("Gagal posting:", err);
      toast.error("Gagal menambahkan postingan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Baris utama input */}
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 rounded-full w-full">
        {/* Avatar dan input */}
        <div className="flex items-center flex-1 gap-3">
          {user && (
            <img
              src={
                user.photo_profile?.startsWith("http")
                  ? user.photo_profile
                  : `http://localhost:2002/${user.photo_profile}`
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}

          <input
            type="text"
            placeholder="What is happening?!"
            className="bg-transparent text-white placeholder:text-zinc-400 w-full focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Icon & Post */}
        <div className="flex items-center gap-3 ml-3">
          <label htmlFor="upload" className="cursor-pointer">
            <img
              src={galleryIcon}
              alt="upload"
              className="w-6 h-6 object-contain text-green-500"
            />
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <Button
            className="bg-green-600 hover:bg-green-700 rounded-full text-white font-medium px-4 py-1"
            onClick={handlePost}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>

      {/* Preview hanya muncul kalau ada gambar */}
      {imagePreview && (
        <div className="mt-2 ml-14 relative w-fit">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-48 rounded-lg"
          />
          <button
            onClick={() => {
              setImagePreview(null);
              setFile(null);
            }}
            className="absolute top-1 right-1 bg-black/50 text-white text-sm px-2 rounded-full"
            title="Hapus gambar"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
