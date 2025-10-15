// 📄 src/components/TreeHeader.jsx
import React from 'react';

const TreeHeader = ({ totalCount, groomCount, brideCount, onDownloadClick }) => {
  return (
    <div className="text-center py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-rose-100/50 z-10">
      <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
        <span className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          <span>Total: {totalCount} members</span>
        </span>
        <span className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Groom: {groomCount}</span>
        </span>
        <span className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          <span>Bride: {brideCount}</span>
        </span>
        <div className="flex justify-end m-auto">
          <button
            onClick={onDownloadClick}
            className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
          >
            <span>📥</span>
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreeHeader;