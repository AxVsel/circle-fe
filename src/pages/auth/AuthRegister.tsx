// pages/auth/AuthRegister.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { api } from "../services/api";
import { login } from "../../redux/slice/authSlice";
import circleIcon from "../../assets/logo.png";

export default function AuthRegister() {
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/v1/auth/register", {
        username,
        full_name,
        email,
        password,
      });

      if (res.data && res.data.data) {
        const userData = res.data.data;
        localStorage.setItem("token", userData.token);

        dispatch(
          login({
            user: userData.user,
            token: userData.token,
          })
        );

        toast.success("Registrasi berhasil!");
        navigate("/");
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Terjadi kesalahan saat register.";
      toast.error(msg);
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
          <h2 className="text-3xl font-bold text-white">
            Create account Circle
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-800 text-white"
          />

          <input
            type="text"
            placeholder="Fullname"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-800 text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 hover:bg-green-700 rounded-full font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
