import { Share2 } from "lucide-react";
import React from "react";

const Message = ({ message }) => {
  const APP_URL = import.meta.env.VITE_APP_URL;

  const formattedTime = String(message?.createdAt)
    .substring(
      String(message?.createdAt).indexOf("T") + 1,
      String(message?.createdAt).indexOf(".")
    )
    .trim();

  return (
    <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-slate-800 border rounded-lg border-slate-600 p-4 sm:p-5 md:p-6 shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300">
      {/* Title */}
      <h3 className="font-bold capitalize text-white text-base sm:text-lg md:text-xl mb-2">
        {message?.msgTitle}
      </h3>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-medium text-gray-400 mb-4">
        <span>{formattedTime}</span>
        <span>12 Oct, 2024</span> {/* Consider passing actual date */}
      </div>

      {/* Message Body */}
      <div className="text-sm sm:text-base text-gray-300 mb-4 whitespace-pre-wrap break-words">
        {message?.msgBody}
      </div>

      {/* Share Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            // Share logic here
          }}
          className="flex items-center gap-1 text-white hover:bg-gray-700 p-2 rounded cursor-pointer transition text-xs sm:text-sm"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Message;
