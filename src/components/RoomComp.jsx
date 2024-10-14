import React from "react";
import { Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const RoomComp = () => {
  return (
    <div className="flex max-w-sm flex-col justify-between bg-slate-800 border rounded-lg border-slate-600 p-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <h3 className="font-bold capitalize text-white text-lg mb-2">
        {"Room Name"}
      </h3>
      <div>
        <div className="flex gap-4 text-xs font-medium text-gray-400 mb-4">
          <span>08:38</span>
          <span>12 Oct, 2024</span>
        </div>
        <div className="text-gray-300 mb-4 text-sm">
          <Link className="text-blue-500 underline">
            https://anon-msngr.live/roomId
          </Link>
        </div>
        <div className="text-sm text-gray-300 mb-4">
          Room Description : Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Dolor reiciendis atque consequatur repellendus! Enim ipsa iure
          fugiat minima quis vero alias eaque dolore, incidunt hic!
        </div>
        <div className="flex justify-end">
          <div
            onClick={() => {}}
            className="flex items-center gap-1 text-white hover:bg-gray-700 p-1 rounded cursor-pointer transition"
          >
            <Share2 size={16} color="white" />
            <span className="text-xs">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomComp;
