// //component/treenode.jsx
// const TreeNode = ({ person }) => {
//   return (
//     <div className="flex flex-col items-center relative">
      
//       {/* Person Card */}
//       <div className="bg-white p-3 rounded-xl shadow z-10">
//         <img src={person.photo} className="w-20 h-20 rounded-full" />
//         <p className="font-semibold">{person.name}</p>
//         <p className="text-xs">{person.relation}</p>
//       </div>

//       {/* Vertical line */}
//       {person.children.length > 0 && (
//         <div className="w-px h-6 bg-gray-400" />
//       )}

//       {/* Children */}
//       {person.children.length > 0 && (
//         <div className="flex gap-10 mt-4">
//           {person.children.map(child => (
//             <TreeNode key={child._id} person={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreeNode;
