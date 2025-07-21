import { useState } from "react";
import { Button } from "@/components/ui/button";
import galleryIcon from "@/assets/gallery-add.png";
import avatar from "@/assets/user.png";

export default function InputPost() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    alert("Posting...");
    setText("");
    setImagePreview(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Baris utama input */}
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 rounded-full w-full">
        {/* Avatar dan input */}
        <div className="flex items-center flex-1 gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
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
          >
            Post
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
            onClick={() => setImagePreview(null)}
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
