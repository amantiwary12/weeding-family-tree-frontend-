import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className=" bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50  p-4 flex justify-between items-center sticky top-0 z-50 ">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-rose-600 cursor-pointer font-serif"
      >
        💍Weeding Family Tree
      </h1>

      <div className="flex gap-4">
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate("/")}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            🏠 Home
          </button>
        )}

        {location.pathname !== "/tree" && (
          <button
            onClick={() => navigate("/tree")}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            Family Tree
          </button>
        )}
      </div>
    </nav>
  );
}
