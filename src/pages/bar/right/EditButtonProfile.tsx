import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import userIcon from "@/assets/user.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/GlobalStore";
import { updateUserProfile } from "@/redux/slice/userSlice";

interface EditProfileDialogProps {
  user: {
    id: number;
    photo_profile?: string;
    full_name: string;
    username: string;
    bio?: string;
  } | null;
}

export default function EditProfileDialog({ user }: EditProfileDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const pfInputRef = useRef<HTMLInputElement>(null);
  const [pfFile, setPfFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setProfile(
        user.photo_profile?.startsWith("http")
          ? user.photo_profile
          : `${import.meta.env.VITE_IMAGE_URL}/${user.photo_profile}`
      );
      setName(user.full_name);
      setUsername(user.username);
      setBio(user.bio || "");
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPfFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!user) return;

    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("username", username);
    formData.append("bio", bio);
    if (pfFile) formData.append("photo_profile", pfFile);

    dispatch(updateUserProfile({ userId: user.id, formData }));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white bg-zinc-900 border-white hover:bg-white/10 text-sm h-8"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-zinc-800 text-white rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">
            Edit profile
          </DialogTitle>
        </DialogHeader>

        {/* Header Cover Dummy */}
        <div className="relative w-full h-24 rounded-lg bg-gradient-to-r from-green-200 via-yellow-200 to-yellow-400 mb-4">
          <div
            className="absolute -bottom-8 left-4 w-20 h-20 rounded-full bg-zinc-800 border-4 border-zinc-950 overflow-hidden cursor-pointer"
            onClick={() => pfInputRef.current?.click()}
          >
            <img
              src={profile || userIcon}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              ref={pfInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Your bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
