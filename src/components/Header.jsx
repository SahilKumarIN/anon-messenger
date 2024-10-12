import { PencilLineIcon } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" bg-slate-400 w-full p-4 flex items-center justify-between shadow-md">
      <h1 className="text-white text-xl font-bold cursor-pointer">{`<anon-messenger/>`}</h1>
      {/* Hamburger Icon for Mobile */}
      <div
        className="text-white text-2xl cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </div>
      {/* Navigation Menu */}
      <ul
        className={`${
          isMenuOpen ? "block z-50" : "hidden"
        } absolute top-16 left-0 w-full bg-slate-400 p-4 flex flex-col gap-2 md:flex md:flex-row md:static md:w-auto md:items-center md:gap-4`}
      >
        <li className="hover:text-white text-gray-600 font-semibold cursor-pointer">
          Home
        </li>
        <li className="hover:text-white text-gray-600 font-semibold cursor-pointer flex items-center gap-1">
          <PencilLineIcon size={14} color=" #4b5563" />
          New Messages
        </li>
        <li className="hover:text-white text-gray-600 font-semibold cursor-pointer">
          About
        </li>
        <li className="hover:text-white text-gray-600 font-semibold cursor-pointer">
          Contact Us
        </li>
      </ul>
    </div>
  );
};

export default Header;
