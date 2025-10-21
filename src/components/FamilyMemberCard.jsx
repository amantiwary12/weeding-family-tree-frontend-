

// 📄 src/components/FamilyMemberCard.jsx
import React from "react";

export default function FamilyMemberCard({ person, BACKEND_URL, onDelete, showSmallDelete = false, compact = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-md flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 border border-rose-100 ${
      compact ? 'p-2 w-20' : 'p-4 w-28'
    }`}>
      <div className={`relative ${compact ? 'mb-1 w-12 h-12' : 'mb-2 w-16 h-16'}`}>
        {person.photo ? (
          <img
            src={
              person.photo.startsWith("http")
                ? person.photo
                : `${BACKEND_URL}${person.photo}`
            }
            alt={person.name}
            className={`object-cover rounded-sm border-1 border-rose-100 shadow-md ${
              compact ? 'w-12 h-12' : 'w-16 h-16'
            }`}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80x80?text=No+Photo";
            }}
          />
        ) : (
          <div className={`bg-gradient-to-br from-rose-100 to-amber-100 rounded-sm flex items-center justify-center border-1 border-rose-100 shadow-md ${
            compact ? 'w-12 h-12' : 'w-16 h-16'
          }`}>
            <span className={`text-rose-500 ${compact ? 'text-sm' : 'text-base'}`}>
              {person.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <h2 className={`font-semibold text-gray-900 ${compact ? 'text-xs mb-0.5' : 'text-sm mb-1'}`}>
        {compact ? 
          (person.name.length > 10 ? person.name.substring(0, 8) + '...' : person.name) 
          : person.name
        }
      </h2>
      
      <p className={`text-gray-600 capitalize ${compact ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
        {compact ? 
          (person.relation?.length > 8 ? person.relation.substring(0, 6) + '...' : person.relation) 
          : person.relation
        }
      </p>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(person._id)}
        className={`bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all flex items-center gap-1 ${
          compact ? "px-1 py-0.5 text-xs" : "px-2 py-1 text-xs"
        }`}
      >
        🗑️ {compact ? "" : "Delete"}
      </button>
    </div>
  );
}