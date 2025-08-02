import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import galleryIcon from "@/assets/gallery-add.png";
import avatar from "@/assets/user.png";
import toast from "react-hot-toast";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { fetchThreads } from "@/redux/slice/threadSlice";
import type { AppDispatch } from "@/redux/GlobalStore";
import type { RootState } from "@/redux/GlobalStore";

export default function DialogPost() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("📸 Input changed:", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("✅ Preview loaded");
        setImage(file);
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("⚠️ Tidak ada file dipilih.");
    }
  };
  const handlePost = async () => {
    if (!text.trim() && !image) {
      toast.error("Isi konten atau unggah gambar terlebih dahulu.");
      return;
    }
    const formData = new FormData();
    formData.append("content", text);
    if (image) {
      formData.append("image", image);
    }
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:2002/api/v1/thread/threads",
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchThreads({ offset: 0, limit: 10 }));

      toast.success("Postingan berhasil ditambahkan!");
      // Reset form
      setText("");
      setImage(null);
      setPreviewUrl(null);
      setOpen(false);
    } catch (error) {
      console.error("Gagal posting:", error);
      toast.error("Gagal menambahkan postingan.");
    } finally {
      setLoading(false);
    }
  };

  console.log("DEBUG previewUrl:", previewUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold px-6 py-2 rounded-full"
        >
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent
        forceMount
        className="max-w-lg bg-zinc-900 text-white rounded-xl px-4 py-3"
      >
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        {/* Avatar + Textarea */}
        <div className="flex items-start gap-3">
          <img
            src={
              user?.photo_profile?.startsWith("http")
                ? user.photo_profile
                : user?.photo_profile
                ? `http://localhost:2002/uploadUser/${user.photo_profile}`
                : avatar
            }
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <Textarea
            placeholder="What is happening?!"
            className="bg-transparent border-none text-white resize-none focus:ring-0 focus-visible:ring-0 placeholder:text-zinc-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Preview Gambar */}
        {previewUrl && (
          <div className="relative mt-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-60 object-contain rounded-md"
            />
            <button
              onClick={() => {
                setPreviewUrl(null);
                setImage(null);
              }}
              className="absolute top-1 right-1 bg-black/50 text-white text-sm px-2 rounded-full"
              title="Hapus gambar"
            >
              ×
            </button>
          </div>
        )}

        {/* Upload + Tombol Post */}
        <div className="flex items-center justify-between mt-2 px-1">
          <label htmlFor="upload-file" className="cursor-pointer">
            <img
              src={galleryIcon}
              alt="upload"
              className="w-6 h-6 object-contain"
            />
          </label>
          <input
            type="file"
            id="upload-file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <Button
            className="bg-green-600 hover:bg-green-700 rounded-full"
            onClick={handlePost}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
