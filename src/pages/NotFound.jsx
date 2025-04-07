import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 px-6 text-center">
      <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-4">
        404
      </h1>
      <p className="text-xl sm:text-2xl text-gray-300 font-semibold mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
