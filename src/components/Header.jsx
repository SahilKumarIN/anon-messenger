import { PencilLineIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/user-auth-context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className=" bg-slate-400 w-full p-4 flex items-center justify-between shadow-md mb-4">
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
        {isAuthenticated() ? (
          <>
            <Link to="/">
              <li className="hover:text-white text-gray-600 font-semibold cursor-pointer">
                Home
              </li>
            </Link>
            {/* <Link to="/">
              <li className="hover:text-white text-gray-600 font-semibold cursor-pointer flex items-center gap-1">
                <PencilLineIcon size={14} color=" #4b5563" />
                Create a Room
              </li>
            </Link> */}
            <Link to="/about">
              <li className="hover:text-white text-gray-600 font-semibold cursor-pointer">
                About
              </li>
            </Link>
            <Link to="/contact">
              <li className="hover:text-white text-gray-600 font-semibold cursor-pointer">
                Contact Us
              </li>
            </Link>
            <Link
              onClick={() => {
                logout();
              }}
              className=" bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className=" bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
