import { PencilLineIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/user-auth-context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-400 w-full px-4 py-3 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={handleLinkClick}>
          <h1 className="text-white text-xl sm:text-2xl font-bold cursor-pointer">{`<anon-messenger/>`}</h1>
        </Link>

        {/* Hamburger Icon (mobile only) */}
        <div
          className="text-white text-3xl cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>

        {/* Navigation Menu */}
        <nav
          className={`
            ${isMenuOpen ? "flex" : "hidden"}
            absolute top-full left-0 w-full bg-slate-400 flex-col items-start p-4 gap-3
            md:static md:flex md:flex-row md:items-center md:w-auto md:p-0 md:gap-6
            transition-all duration-300 ease-in-out
          `}
        >
          {isAuthenticated() ? (
            <>
              <li className="list-none" onClick={handleLinkClick}>
                <Link
                  className="text-gray-600 hover:text-white font-semibold"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* Uncomment when needed */}
              {/* <li className="list-none" onClick={handleLinkClick}>
                <Link className="text-gray-600 hover:text-white font-semibold flex items-center gap-1" to="/">
                  <PencilLineIcon size={14} color="#4b5563" />
                  Create a Room
                </Link>
              </li> */}

              <li className="list-none" onClick={handleLinkClick}>
                <Link
                  className="text-gray-600 hover:text-white font-semibold"
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li className="list-none" onClick={handleLinkClick}>
                <Link
                  className="text-gray-600 hover:text-white font-semibold"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>

              <li className="list-none" onClick={handleLinkClick}>
                <Link
                  className="text-gray-600 hover:text-white font-semibold"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>

              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <li className="list-none" onClick={handleLinkClick}>
              <Link
                to="/auth"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition inline-block"
              >
                Login
              </Link>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
