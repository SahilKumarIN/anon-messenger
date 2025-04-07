import React from "react";
import { MousePointer2, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDb } from "../context/db-context";

const RoomComp = ({ data }) => {
  const navigate = useNavigate();
  const { deleteRoom } = useDb();
  const APP_URL = import.meta.env.VITE_APP_URL;

  return (
    <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl bg-gray-900 border border-gray-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white break-words">
          {data?.roomName}
        </h3>
        <span className="text-xs sm:text-sm text-gray-400">
          08:38 • 12 Oct, 2024
        </span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-sm sm:text-base text-gray-300 whitespace-pre-wrap break-words">
          {data?.roomDescription}
        </p>
      </div>

      {/* Room Link */}
      <div className="mb-4">
        <Link
          to="#"
          className="block text-blue-400 underline text-sm sm:text-base break-words"
        >
          {`${APP_URL}/${data.roomId}`}
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-2">
        <button
          onClick={() => navigate(`/room/${data.roomId}`)}
          className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm sm:text-base transition duration-200"
        >
          <MousePointer2 size={18} />
          View Room
        </button>

        <button
          onClick={() => deleteRoom(data.$id)}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm sm:text-base transition duration-200"
        >
          <Trash2 size={18} />
          Delete Room
        </button>
      </div>
    </div>
  );
};

export default RoomComp;
