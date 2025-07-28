// pages/auth/AuthLogin.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice"; // pastikan login action tersedia
import { api } from "../services/api"; // axios instance
import circleIcon from "../../assets/logo.png";
import { toast } from "react-hot-toast";

export default function AuthLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/v1/auth/login", {
        identifier,
        password,
      });

      if (res.data && res.data.data) {
        const userData = res.data.data;

        const user = {
          id: userData.user_id,
          username: userData.username,
          full_name: userData.name,
          email: userData.email,
          photo_profile: userData.photo_profile,
          background: userData.background,
        };

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(user)); // ✅ Tambahkan ini

        dispatch(
          login({
            user,
            token: userData.token,
          })
        );

        toast.success("Login berhasil!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login gagal. Cek kembali email/username dan password.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center p-4 bg-zinc-900">
      <div className="w-full max-w-sm space-y-6 text-white">
        <div className="flex flex-col">
          <img
            src={circleIcon}
            alt="Logo"
            className="w-34 h-auto object-contain mb-2"
          />
          <h2 className="text-3xl font-bold text-white">Login to Circle</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email/Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-800 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-800 text-white"
          />

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-gray-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Don’t have an account yet?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
