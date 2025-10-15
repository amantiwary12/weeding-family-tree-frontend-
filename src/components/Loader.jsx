import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading family tree...</p>
      </div>
    </div>
  );
}
