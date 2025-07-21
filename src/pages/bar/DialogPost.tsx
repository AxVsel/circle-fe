import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import galleryIcon from "@/assets/gallery-add.png";
import avatar from "@/assets/user.png";

export default function DialogPost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    console.log("Posting:", text);
    console.log("Image file:", image);
    setText("");
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold px-6 py-2 rounded-full">
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-zinc-900 text-white rounded-xl px-4 py-3">
        <DialogHeader />

        {/* Avatar + Textarea */}
        <div className="flex items-start gap-3">
          <img
            src={avatar}
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
          <div className="mt-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-60 object-contain rounded-md"
            />
          </div>
        )}

        {/* Upload + Tombol Post */}
        <div className="flex items-center justify-between mt-2 px-1">
          <label htmlFor="upload" className="cursor-pointer">
            <img
              src={galleryIcon}
              alt="upload"
              className="w-6 h-6 object-contain"
            />
            <input
              type="file"
              id="upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <Button
            className="bg-green-600 hover:bg-green-700 rounded-full"
            onClick={handlePost}
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
