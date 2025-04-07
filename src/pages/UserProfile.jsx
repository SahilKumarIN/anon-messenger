import React from "react";
import { useAuth } from "../context/user-auth-context";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-lg">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex justify-center items-start">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold mb-4">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>
          <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
          <p className="text-gray-400 text-sm mb-4">{user.email}</p>
        </div>
        <div className="text-sm mt-4 space-y-2">
          <div className="flex justify-between border-b border-slate-600 pb-2">
            <span className="font-medium text-gray-300">User ID:</span>
            <span className="text-gray-400">{user.$id}</span>
          </div>
          <div className="flex justify-between border-b border-slate-600 pb-2">
            <span className="font-medium text-gray-300">Created On:</span>
            <span className="text-gray-400">
              {new Date(user.$createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transition duration-150">
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
