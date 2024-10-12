import { Share2 } from "lucide-react";
import React from "react";

const Message = () => {
  return (
    <div className="flex flex-col justify-between bg-slate-800 border rounded-lg border-slate-600 p-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <h3 className="font-bold capitalize text-white text-lg mb-2">
        {"Message Title"}
      </h3>
      <div>
        <div className="flex gap-4 text-xs font-medium text-gray-400 mb-4">
          <span>08:38</span>
          <span>12 Oct, 2024</span>
        </div>
        <div className="text-sm text-gray-300 mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At nemo
          doloribus repellat perferendis inventore magni sunt aut ad non dolorum
          a accusantium vitae suscipit, vel eveniet ratione animi numquam
          voluptatibus!
        </div>
        <div className="flex justify-end">
          <div className="flex items-center gap-1 text-white hover:bg-gray-700 p-1 rounded cursor-pointer transition">
            <Share2 size={16} color="white" />
            <span className="text-xs">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
