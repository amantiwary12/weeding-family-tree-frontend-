// //component/familytree.jsx
// import React from "react";
// import FamilyMemberCard from "./FamilyMemberCard";

// // 🌳 Build tree from flat list
// // function buildTree(people) {
// //   const map = {};
// //   people.forEach(p => {
// //     map[p._id] = { ...p, children: [] };
// //   });

// //   const roots = [];
// //   people.forEach(p => {
// //   if (p.parents && p.parents.length > 0) {
// //     p.parents.forEach(parentId => {
// //       if (idMap[parentId]) {
// //         idMap[parentId].children.push(idMap[p._id]);
// //       }
// //     });
// //   }
// // });

// //   return roots;
// // }

// // const idMap = {};
// // people.forEach(p => {
// //   idMap[p._id] = { ...p, children: [] };
// // });


// /**
//  * 🔁 Recursive Tree Node
//  */
// const TreeNode = ({ person, people, onDelete, BACKEND_URL, compact }) => {
//   // Find children of this person
//   const children = people.filter(
//     (p) => p.parents && p.parents.includes(person._id)
//   );

  


//   return (
//     <div className="flex flex-col items-center">
//       {/* Person Card */}
//       <FamilyMemberCard
//         person={person}
//         BACKEND_URL={BACKEND_URL}
//         onDelete={onDelete}
//         compact={compact}
//       />

//       {/* Vertical line */}
//       {children.length > 0 && (
//         <div className="w-px h-6 bg-gray-400 my-2"></div>
//       )}

//       {/* Children */}
//       {children.length > 0 && (
//         <div className="flex gap-8">
//           {children.map((child) => (
//             <TreeNode
//               key={child._id}
//               person={child}
//               people={people}
//               onDelete={onDelete}
//               BACKEND_URL={BACKEND_URL}
//               compact={compact}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /**
//  * 🌳 Family Tree Root
//  */

// const FamilyTree = ({ people, onDelete, BACKEND_URL, compact = false }) => {

//   // Root nodes = people with NO parents
//   const roots = people.filter(
//     (p) => !p.parents || p.parents.length === 0
//   );

//   if (!people || people.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No family members yet.
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center gap-16 overflow-x-auto py-6">
//       {roots.map((root) => (
//         <TreeNode
//           key={root._id}
//           person={root}
//           people={people}
//           onDelete={onDelete}
//           BACKEND_URL={BACKEND_URL}
//           compact={compact}
//         />
//       ))}
//     </div>
//   );
// };


// export default FamilyTree;






// 📄 src/components/FamilyTree.jsx
import React, { useMemo } from "react";
import Tree from "react-d3-tree";

const FamilyTree = ({ people, onDelete, BACKEND_URL }) => {

  // Convert flat list → hierarchy
  const treeData = useMemo(() => {
    if (!people || people.length === 0) return [];

    const idMap = {};
    people.forEach(person => {
      idMap[person._id] = {
        ...person,
        name: person.name,
        children: []
      };
    });

    const roots = [];

    people.forEach(person => {
      if (person.parents && person.parents.length > 0) {
        person.parents.forEach(parentId => {
          if (idMap[parentId]) {
            idMap[parentId].children.push(idMap[person._id]);
          }
        });
      } else {
        roots.push(idMap[person._id]);
      }
    });

    return roots;
  }, [people]);

  if (!treeData.length) {
    return <div className="text-center py-10">No family members yet.</div>;
  }

  // 🎨 Custom Node UI
  const renderCustomNode = ({ nodeDatum }) => {
    return (
      <g>
        {/* Card Background */}
        <foreignObject x="-100" y="-80" width="200" height="160">
          <div className="bg-white rounded-xl shadow-lg p-3 text-center border border-gray-200">

            {/* Profile Image */}
            <img
              // src={
              //   nodeDatum.photo
              //     ? `${BACKEND_URL}/${nodeDatum.photo}`
              //     : "https://via.placeholder.com/80"
              // }
              src={
  nodeDatum.photo
    ? nodeDatum.photo.startsWith("http")
      ? nodeDatum.photo
      : `${BACKEND_URL}/${nodeDatum.photo}`
    : "https://via.placeholder.com/80"
}

              alt={nodeDatum.name}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-rose-300"
            />

            {/* Name */}
            <h3 className="font-semibold text-sm mt-2">
              {nodeDatum.name}
            </h3>

            {/* Relation */}
            <p className="text-xs text-gray-500">
              {nodeDatum.relation}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(nodeDatum._id)}
              className="mt-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>

          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        collapsible
        zoomable
        separation={{ siblings: 1.8, nonSiblings: 2 }}
        transitionDuration={500}
        renderCustomNodeElement={renderCustomNode}
        nodeSize={{ x: 250, y: 220 }}
        draggable={false}
      /> */}
      <Tree
  data={treeData}
  orientation="vertical"
  pathFunc="step"
  collapsible={true}
  shouldCollapseNeighborNodes={false}
  zoomable={true}
  // draggable={false}
  onNodeClick={() => {}}
  separation={{ siblings: 1.8, nonSiblings: 2 }}
  transitionDuration={500}
  renderCustomNodeElement={renderCustomNode}
  nodeSize={{ x: 250, y: 220 }}
/>

    </div>
  );
};

export default FamilyTree;
