import React from "react";
import { PencilLine } from "lucide-react";
import Message from "../components/Message";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-h-[80vh] overflow-y-scroll scroll-smooth scroll-m-2">
        {new Array(12).fill(null).map((_, index) => (
          <Message key={index} />
        ))}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white bg-gray-700 p-2 rounded cursor-pointer transition">
        <PencilLine size={16} color="white" />
        {/* <span className="text-xs">New Message</span> */}
      </div>
    </>
  );
};

export default Home;
