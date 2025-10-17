// import React from "react";

// // export default function FamilyMemberCard({ person, BACKEND_URL, onDelete , showSmallDelete = false}) {
// const FamilyMemberCard = ({ person, BACKEND_URL, onDelete, showSmallDelete = false, compact = false }) => {
//   return (
//     <div className={`bg-white rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 border border-rose-100 ${
//       compact ? 'p-4' : 'p-6'
//     }`}>
//       <div className="relative mb-4">
//         {person.photo ? (
//           <img
//             src={
//               person.photo.startsWith("http")
//                 ? person.photo
//                 : `${BACKEND_URL}${person.photo}`
//             }
//             alt={person.name}
//             className="w-32 h-32 object-cover rounded-sm  border-1 border-rose-10 shadow-md"
//             onError={(e) => {
//               e.target.src = "https://via.placeholder.com/80x80?text=No+Photo";
//             }}
//           />
//         ) : (
//           <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center border-4 border-rose-100 shadow-md">
//             <span className="text-2xl text-rose-500">
//               {person.name.charAt(0).toUpperCase()}
//             </span>
//           </div>
//         )}
//         {/* <div
//           className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
//             person.side === "groom" ? "bg-blue-500" : "bg-pink-500"
//           }`}
//         ></div> */}
//       </div>

//       <h2 className="text-xl font-semibold text-gray-900 mb-1">
//         {person.name}
//       </h2>
//       <p className="text-sm text-gray-600 mb-2 capitalize">
//         {person.relation || "Family Member"}
//       </p>
//       {/* <div className="flex items-center gap-2 mb-4">
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             person.side === "groom"
//               ? "bg-blue-100 text-blue-800"
//               : "bg-pink-100 text-pink-800"
//           }`}
//         >
//           {person.side === "groom" ? "Groom Side" : "Bride Side"}
//         </span>
//       </div> */}

//        {/* Smaller Delete Button */}
//       <button
//         onClick={() => onDelete(person._id)}
//         className={`mt-auto bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all flex items-center gap-1 ${
//           showSmallDelete 
//             ? "px-2 py-1 text-xs" 
//             : "px-4 py-2 text-sm font-semibold"
//         }`}
//       >
//         🗑️ {showSmallDelete ? "" : "Delete"}
//       </button>
//     </div>
//   );
// }






// 📄 src/components/FamilyMemberCard.jsx
import React from "react";

export default function FamilyMemberCard({ person, BACKEND_URL, onDelete, showSmallDelete = false, compact = false }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 border border-rose-100 ${
      compact ? 'p-4' : 'p-6'
    }`}>
      <div className="relative mb-4">
        {person.photo ? (
          <img
            src={
              person.photo.startsWith("http")
                ? person.photo
                : `${BACKEND_URL}${person.photo}`
            }
            alt={person.name}
            className="w-32 h-32 object-cover rounded-sm border-1 border-rose-100 shadow-md"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80x80?text=No+Photo";
            }}
          />
        ) : (
          <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-amber-100 rounded-sm flex items-center justify-center border-1 border-rose-100 shadow-md">
            <span className="text-2xl text-rose-500">
              {person.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {person.name}
      </h2>
      <p className="text-sm text-gray-600 mb-2 capitalize">
        {person.relation || "Family Member"}
      </p>

      {/* Smaller Delete Button */}
      <button
        onClick={() => onDelete(person._id)}
        className={`mt-auto bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all flex items-center gap-1 ${
          showSmallDelete 
            ? "px-2 py-1 text-xs" 
            : "px-4 py-2 text-sm font-semibold"
        }`}
      >
        🗑️ {showSmallDelete ? "" : "Delete"}
      </button>
    </div>
  );
}