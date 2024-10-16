import React from "react";
import { MousePointer2, Share2, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDb } from "../context/db-context";

const RoomComp = ({ data }) => {
  const navigate = useNavigate();
  const { deleteRoom } = useDb();

  const APP_URL = import.meta.env.VITE_APP_URL;
  return (
    <div className="flex flex-col max-w-full sm:max-w-sm lg:max-w-md xl:max-w-lg bg-gray-900 border rounded-lg border-gray-700 p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{data?.roomName}</h3>
        <span className="text-xs text-gray-400">08:38 • 12 Oct, 2024</span>
      </div>
      <div className="mb-4">
        {/* <p className="text-sm text-gray-300 mb-1">Room Description:</p> */}
        <p className="text-sm text-gray-300">{data?.roomDescription}</p>
      </div>
      <div className="mb-4">
        <Link
          to="#"
          className="block text-blue-500 underline text-sm mb-2 break-all"
        >
          {`${APP_URL}/${data.roomId}`}
        </Link>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            navigate(`/room/${data.roomId}`);
          }}
          className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-500 p-2 px-4 rounded-lg transition duration-200 ease-in-out"
        >
          <MousePointer2 size={18} />
          <span className="text-sm">View Room</span>
        </button>
        <button
          onClick={() => {
            deleteRoom(data.$id);
          }}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-500 p-2 px-4 rounded-lg transition duration-200 ease-in-out"
        >
          <Trash2 size={18} />
          <span className="text-sm">Delete Room</span>
        </button>
      </div>
    </div>
  );
};

export default RoomComp;
