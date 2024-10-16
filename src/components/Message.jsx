import { Share2 } from "lucide-react";
import React from "react";

const Message = ({ message }) => {
  const APP_URL = import.meta.env.VITE_APP_URL;
  console.log(message);
  return (
    <div className="flex flex-col justify-between bg-slate-800 border rounded-lg border-slate-600 p-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <h3 className="font-bold capitalize text-white text-lg mb-2">
        {message?.msgTitle}
      </h3>
      <div>
        <div className="flex gap-4 text-xs font-medium text-gray-400 mb-4">
          <span>
            {String.toString(message?.createdAt).substring(
              String.toString(message?.createdAt).indexOf("T"),
              String.toString(message?.createdAt).indexOf(".")
            )}
          </span>
          <span>12 Oct, 2024</span>
        </div>
        <div className="text-sm text-gray-300 mb-4">{message?.msgBody}</div>
        <div className="flex justify-end">
          <div
            onClick={() => {
              console.log(`${APP_URL}`);
            }}
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

export default Message;
