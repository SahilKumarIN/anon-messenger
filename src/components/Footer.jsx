import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center w-full  py-2 bg-gray-700 opacity-70">
      <span className="text-white text-center">
        Made with 💖 by{" "}
        <Link className="text-blue-300 font-bold underline" to="#">
          Sahil Kumar
        </Link>
      </span>
    </div>
  );
};

export default Footer;
