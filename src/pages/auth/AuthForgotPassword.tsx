import circleIcon from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function AuthForgotPassword() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center p-4 bg-zinc-900">
        <div className="w-full max-w-sm space-y-6 text-white">
          {/* Logo dan Title */}
          <div className="flex flex-col">
            <img
              src={circleIcon}
              alt="Logo"
              className="w-30 h-auto object-contain mb-2"
            />
            <h2 className="text-3xl font-bold text-white">Forgot password</h2>
          </div>

          {/* Form Input */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-600 hover:bg-green-700 rounded-full font-semibold transition"
            >
              Send Instruction
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-300">
            Already have account?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
