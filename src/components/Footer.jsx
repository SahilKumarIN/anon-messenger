import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-700 opacity-90">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center">
        <span className="text-white text-sm sm:text-base md:text-lg">
          Made with 💖 by{" "}
          <Link
            className="text-blue-300 font-semibold underline hover:text-blue-400 transition"
            to="#"
          >
            Sahil Kumar
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
