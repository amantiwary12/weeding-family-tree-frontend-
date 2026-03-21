// // 📄 src/components/CompactTreeLayout.jsx
// import React from "react";
// import FamilyMemberCard from "./FamilyMemberCard";
// import { normalizeRelation } from "../utils/relationshipUtils";

// const CompactTreeLayout = ({ people, side, onDelete, BACKEND_URL }) => {
  
//   const grandparents = people.filter(
//     (p) => normalizeRelation(p.relation) === "grandparents"
//   );

//   const parents = people.filter(
//     (p) => normalizeRelation(p.relation) === "parents"
//   );

//   const spouses = people.filter(
//     (p) => normalizeRelation(p.relation) === "spouses"
//   );

//   const siblings = people.filter(
//     (p) => normalizeRelation(p.relation) === "siblings"
//   );

//   const children = people.filter(
//     (p) => normalizeRelation(p.relation) === "children"
//   );

//   const others = people.filter(
//     (p) => normalizeRelation(p.relation) === "others"
//   );




//   const GenerationSection = ({ title, members, showConnector = false }) => (
//     <>
//       {members.length > 0 && (
//         <div className="text-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3 bg-white/80 px-3 py-1 rounded-lg shadow-sm">
//             {title}
//           </h3>
//           <div className="flex flex-wrap justify-center gap-3">
//             {members.map((person) => (
//               <div
//                 key={person._id}
//                 className="transform hover:scale-105 transition-transform duration-300"
//               >
//                 <FamilyMemberCard
//                   person={person}
//                   BACKEND_URL={BACKEND_URL}
//                   onDelete={onDelete}
//                   showSmallDelete={true}
//                   compact={true} // Use compact mode
//                 />
//               </div>
//             ))}
//           </div>
//           {showConnector && (
//             <div className="w-1 h-8 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mt-3 mx-auto"></div>
//           )}
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full py-4 px-2">
//       <GenerationSection
//         title="Grandparents"
//         members={grandparents}
//         showConnector={parents.length > 0}
//       />

//       <GenerationSection
//         title="Parents"
//         members={parents}
//         showConnector={children.length > 0 || siblings.length > 0}
//       />

//       {(children.length > 0 || siblings.length > 0) && (
//         <GenerationSection
//           title="Current Gen"
//           members={[...children, ...siblings]}
//         />
//       )}

//       <GenerationSection title="Spouses" members={spouses} />
//       <GenerationSection title="Others" members={others} />
//     </div>
//   );
// };

// export default CompactTreeLayout;
