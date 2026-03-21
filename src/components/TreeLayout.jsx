// // 📄 src/components/TreeLayout.jsx
// import React from "react";
// import FamilyMemberCard from "./FamilyMemberCard";
// import { normalizeRelation } from "../utils/relationshipUtils";

// const TreeLayout = ({ people, side, onDelete, BACKEND_URL, compact = false }) => {
//   // 🔒 Safety: always work with array
//   const safePeople = Array.isArray(people) ? people : [];

//   // 🧠 Group by normalized relation
//   const grandparents = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "grandparents"
//   );

//   const parents = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "parents"
//   );

//   const inLaws = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "inlaws"
//   );

//   const spouses = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "spouses"
//   );

//   const siblings = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "siblings"
//   );

//   const children = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "children"
//   );

//   const others = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "others"
//   );

//   // 🎨 Section renderer
//   const GenerationSection = ({ title, members, showConnector = false }) => {
//     if (!members || members.length === 0) return null;

//     return (
//       <div className={`text-center ${compact ? "mb-2" : "mb-4"}`}>
//         <h3
//           className={`font-semibold text-gray-700 ${
//             compact
//               ? "text-xs mb-1 bg-white/60 px-2 py-1 rounded"
//               : "text-lg mb-3 bg-white/80 px-3 py-1 rounded-lg"
//           } shadow-sm`}
//         >
//           {title}
//         </h3>

//         <div
//           className={`flex flex-wrap justify-center ${
//             compact ? "gap-1" : "gap-3"
//           }`}
//         >
//           {members.map((person) => (
//             <FamilyMemberCard
//               key={person._id}
//               person={person}
//               BACKEND_URL={BACKEND_URL}
//               onDelete={onDelete}
//               compact={compact}
//             />
//           ))}
//         </div>

//         {showConnector && (
//           <div
//             className={`w-1 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mx-auto ${
//               compact ? "h-4 mt-1" : "h-6 mt-2"
//             }`}
//           />
//         )}
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`flex flex-col items-center w-full ${
//         compact ? "space-y-2 py-2" : "space-y-4 py-4"
//       }`}
//     >
//       <GenerationSection
//         title={compact ? "Grandparents" : "Grandparents Generation"}
//         members={grandparents}
//         showConnector={parents.length > 0}
//       />

//       <GenerationSection
//         title="In-Laws"
//         members={inLaws}
//         showConnector={parents.length > 0}
//       />

//       <GenerationSection
//         title={compact ? "Parents" : "Parents Generation"}
//         members={parents}
//         showConnector={siblings.length > 0 || children.length > 0}
//       />

//       <GenerationSection
//         title={compact ? "Siblings" : "Siblings"}
//         members={siblings}
//       />

//       <GenerationSection
//         title={compact ? "Children" : "Children"}
//         members={children}
//       />

//       <GenerationSection
//         title={compact ? "Spouses" : "Spouses & Partners"}
//         members={spouses}
//       />

//       <GenerationSection
//         title={compact ? "Others" : "Other Relatives"}
//         members={others}
//       />
//     </div>
//   );
// };

// export default TreeLayout;







// // 📄 src/components/TreeLayout.jsx
// import React from "react";
// import FamilyMemberCard from "./FamilyMemberCard";
// import { normalizeRelation } from "../utils/relationshipUtils";
// const TreeLayout = ({ people, side, onDelete, BACKEND_URL, compact = false }) => {
//   // 🔒 Safety: always work with array
//   const safePeople = Array.isArray(people) ? people : [];

//   // 🧠 Group by normalized relation
//   const grandparents = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "grandparents"
//   );

//   const parents = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "parents"
//   );

//   const inLaws = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "inlaws"
//   );

//   const spouses = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "spouses"
//   );

//   const siblings = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "siblings"
//   );

//   const children = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "children"
//   );

//   const others = safePeople.filter(
//     (p) => normalizeRelation(p.relation) === "others"
//   );

// const peopleMap = {};
// safePeople.forEach(p => {
//   peopleMap[p._id] = { ...p, children: [] };
// });

// safePeople.forEach(p => {
//   p.parents?.forEach(parentId => {
//     if (peopleMap[parentId]) {
//       peopleMap[parentId].children.push(peopleMap[p._id]);
//     }
//   });
// });

// const roots = Object.values(peopleMap).filter(
//   p => !p.parents || p.parents.length === 0
// );

//   // const roots = safePeople.filter(p => !p.parentId);
// const childrenMap = {};

// safePeople.forEach(p => {
//   if (p.parentId) {
//     if (!childrenMap[p.parentId]) {
//       childrenMap[p.parentId] = [];
//     }
//     childrenMap[p.parentId].push(p);
//   }
// });
//   // 🎨 Section renderer
//   const GenerationSection = ({ title, members, showConnector = false }) => {
//     if (!members || members.length === 0) return null;

//     return (
//       <div className={`text-center ${compact ? "mb-2" : "mb-4"}`}>
//         <h3
//           className={`font-semibold text-gray-700 ${
//             compact
//               ? "text-xs mb-1 bg-white/60 px-2 py-1 rounded"
//               : "text-lg mb-3 bg-white/80 px-3 py-1 rounded-lg"
//           } shadow-sm`}
//         >
//           {title}
//         </h3>

//         <div
//           className={`flex flex-wrap justify-center ${
//             compact ? "gap-1" : "gap-3"
//           }`}
//         >
//           {members.map((person) => (
//             <FamilyMemberCard
//               key={person._id}
//               person={person}
//               BACKEND_URL={BACKEND_URL}
//               onDelete={onDelete}
//               compact={compact}
//             />
//           ))}
//         </div>

//         {showConnector && (
//           <div
//             className={`w-1 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mx-auto ${
//               compact ? "h-4 mt-1" : "h-6 mt-2"
//             }`}
//           />
//         )}
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`flex flex-col items-center w-full ${
//         compact ? "space-y-2 py-2" : "space-y-4 py-4"
//       }`}
//     >
//       <GenerationSection
//         title={compact ? "Grandparents" : "Grandparents Generation"}
//         members={grandparents}
//         showConnector={parents.length > 0}
//       />

//       <GenerationSection
//         title="In-Laws"
//         members={inLaws}
//         showConnector={parents.length > 0}
//       />

//       <GenerationSection
//         title={compact ? "Parents" : "Parents Generation"}
//         members={parents}
//         showConnector={siblings.length > 0 || children.length > 0}
//       />

//       <GenerationSection
//         title={compact ? "Siblings" : "Siblings"}
//         members={siblings}
//       />

//       <GenerationSection
//         title={compact ? "Children" : "Children"}
//         members={children}
//       />

//       <GenerationSection
//         title={compact ? "Spouses" : "Spouses & Partners"}
//         members={spouses}
//       />

//       <GenerationSection
//         title={compact ? "Others" : "Other Relatives"}
//         members={others}
//       />
//     </div>
//   );
// };

// export default TreeLayout;



