import React, { useEffect, useState } from "react";
import { Eye, EyeOffIcon, Info } from "lucide-react";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/user-auth-context";
import toast from "react-hot-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { isAuthenticating, register, login, error, isAuthenticated, user } =
    useAuth();
  const [isLoggingIn, setIsLogingIn] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    isLoggingIn ? login(email, password) : register(username, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-slate-700 px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-600 transition-all shadow-md shadow-emerald-300 hover:shadow-pink-500 text-white p-6 sm:p-8 md:p-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Login / Signup Toggle */}
          <div className="flex mb-6 gap-2 bg-black p-2 rounded-md">
            <div
              className={`flex-1 cursor-pointer text-center font-bold text-base sm:text-lg ${
                isLoggingIn ? "bg-slate-400" : "bg-transparent"
              } py-2 px-4 rounded-md`}
              onClick={() => setIsLogingIn(true)}
            >
              Login
            </div>
            <div
              className={`flex-1 cursor-pointer text-center font-bold text-base sm:text-lg ${
                !isLoggingIn ? "bg-slate-400" : "bg-transparent"
              } py-2 px-4 rounded-md`}
              onClick={() => setIsLogingIn(false)}
            >
              Signup
            </div>
          </div>

          {/* Username */}
          {!isLoggingIn && (
            <input
              type="text"
              className="w-full mb-4 p-2 rounded-md bg-transparent border border-gray-300 text-white placeholder-gray-400"
              placeholder="Your Name"
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          )}

          {/* Email */}
          <input
            type="email"
            className="w-full mb-4 p-2 rounded-md bg-transparent border border-gray-300 text-white placeholder-gray-400"
            placeholder="Your email"
            value={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {/* Password Field */}
          <div className="w-full mb-4 flex flex-col sm:flex-row gap-2 items-stretch">
            <button
              type="button"
              className="flex items-center gap-1 bg-white text-black font-bold px-2 py-2 rounded-md border border-gray-300 w-full sm:w-fit justify-center"
              onClick={() => setPasswordHidden(!passwordHidden)}
            >
              {passwordHidden ? <Eye size={18} /> : <EyeOffIcon size={18} />}
              Password
            </button>
            <input
              type={passwordHidden ? "password" : "text"}
              className="flex-1 p-2 rounded-md bg-transparent border border-gray-300 text-white placeholder-gray-400"
              placeholder="(min. 8 chars - A-Z, a-z, 0-9, special chars)"
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full transition-all hover:shadow-md hover:shadow-emerald-400 bg-white p-2 rounded-md text-black font-bold"
          >
            {isAuthenticating ? (
              <BarLoader color="gray" width="100%" />
            ) : isLoggingIn ? (
              "Login"
            ) : (
              "Signup"
            )}
          </button>
        </form>

        {/* Info Message */}
        <div className="text-sm text-center text-gray-200 mt-4 flex items-center justify-center gap-2">
          <Info size={16} />
          You'll be automatically registered if account not found.
        </div>
      </div>
    </div>
  );
};

export default Auth;
