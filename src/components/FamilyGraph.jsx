// // src/components/FamilyGraph.jsx

// import React, { useMemo } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   Handle,
//   Position,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { BACKEND_URL } from "../config/env";

// const nodeWidth = 180;
// const nodeHeight = 150;

// /* ==============================
//    CUSTOM NODE
// ============================== */
// const ImageNode = ({ data }) => {
//   return (
//     <div
//       style={{
//         width: nodeWidth,
//         height: nodeHeight,
//         borderRadius: 16,
//         background: "#fff",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 10,
//         position: "relative",
//       }}
//     >
//       {/* DELETE BUTTON */}
//       {data.onDelete && !data.isRoot && (
//         <button
//           onClick={() => data.onDelete(data.id)}
//           style={{
//             position: "absolute",
//             top: 5,
//             right: 5,
//             background: "red",
//             color: "#fff",
//             border: "none",
//             borderRadius: "50%",
//             width: 22,
//             height: 22,
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           ×
//         </button>
//       )}

//       <img
//         src={
//           data.photo
//             ? data.photo.startsWith("http")
//               ? data.photo
//               : `${BACKEND_URL}/${data.photo}`
//             : "https://via.placeholder.com/80"
//         }
//         alt={data.name}
//         style={{
//           width: 70,
//           height: 70,
//           borderRadius: "50%",
//           objectFit: "cover",
//           marginBottom: 8,
//         }}
//       />

//       <strong>{data.name}</strong>
//       <span style={{ fontSize: 12, color: "#777" }}>
//         {data.relation}
//       </span>

//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />
//     </div>
//   );
// };

// const nodeTypes = { imageNode: ImageNode };

// /* ===================================
//    MAIN GRAPH
// =================================== */
// const FamilyGraph = ({ people = [], onDelete }) => {
//   const { nodes, edges } = useMemo(() => {
//     if (!people?.length) return { nodes: [], edges: [] };

//     const nodes = [];
//     const edges = [];
//     const map = {};

//     /* =========================
//        NORMALIZE DATA
//     ========================== */
//     people.forEach(p => {
//       let parsedParents = [];

//       if (Array.isArray(p.parents)) {
//         parsedParents = p.parents;
//       } else if (typeof p.parents === "string") {
//         try {
//           parsedParents = JSON.parse(p.parents);
//         } catch {
//           parsedParents = [];
//         }
//       }

//       map[p._id] = {
//         ...p,
//         parents: parsedParents,
//       };
//     });
    


//     /* =========================
//    RELATION BASED GROUPING
// ========================= */

// const normalize = (rel) => rel?.toLowerCase();

// const grandparents = people.filter(p =>
//   ["grandfather", "grandmother"].includes(normalize(p.relation))
// );

// const parents = people.filter(p =>
//   ["father", "mother"].includes(normalize(p.relation))
// );

// const root = people.find(p =>
//   ["groom", "bride"].includes(normalize(p.relation))
// );

// const siblings = people.filter(p =>
//   ["brother", "sister", "elder sister", "elder brother"].includes(normalize(p.relation))
// );

// const children = people.filter(p =>
//   ["son", "daughter"].includes(normalize(p.relation))
// );

// const others = people.filter(p =>
//   ![
//     ...grandparents,
//     ...parents,
//     root,
//     ...siblings,
//     ...children,
//   ].includes(p)
// );
//     /* =========================
//        FIND ROOTS
//     ========================== */
//     const groom = people.find(
//       p => p.relation?.toLowerCase() === "groom"
//     );

//     const bride = people.find(
//       p => p.relation?.toLowerCase() === "bride"
//     );

//     if (!groom || !bride) {
//       console.warn("⚠ Groom or Bride missing");
//     }

//     /* =========================
//        GENERATION LEVELS
//     ========================== */
//     const levels = {};
//     const queue = [];

//     if (groom) {
//       levels[groom._id] = 3;
//       queue.push(groom._id);
//     }

//     if (bride) {
//       levels[bride._id] = 3;
//       queue.push(bride._id);
//     }

//     while (queue.length) {
//       const currentId = queue.shift();
//       const current = map[currentId];

//       if (!current) continue;

//       // Parents (above)
//       current.parents?.forEach(parentId => {
//         if (!levels[parentId] && map[parentId]) {
//           levels[parentId] = levels[currentId] - 1;
//           queue.push(parentId);
//         }
//       });

//       // Children (below)
//       people.forEach(p => {
//         const parents = map[p._id]?.parents || [];
//         if (parents.includes(currentId)) {
//           if (!levels[p._id]) {
//             levels[p._id] = levels[currentId] + 1;
//             queue.push(p._id);
//           }
//         }
//       });
//     }

//     /* =========================
//        ENSURE NO ONE IS LOST
//     ========================== */
//     people.forEach(p => {
//       if (!levels[p._id]) {
//         levels[p._id] = 3; // fallback level
//       }
//     });

//     /* =========================
//        GROUP BY LEVEL
//     ========================== */
//     const grouped = {};

//     Object.keys(levels).forEach(id => {
//       const lvl = levels[id];
//       if (!grouped[lvl]) grouped[lvl] = [];
//       grouped[lvl].push(map[id]);
//     });

//    /* =========================
//    LAYER POSITIONING
// ========================= */

// const layers = [
//   grandparents,
//   parents,
//   root ? [root] : [],
//   siblings,
//   children,
//   others
// ];

// const levelHeight = 100;
// const horizontalGap = 220;
// const centerX = 600;

// layers.forEach((layer, layerIndex) => {
//   const y = (layerIndex + 1) * levelHeight;

//   layer.forEach((person, index) => {
//     const x =
//       centerX +
//       index * horizontalGap -
//       ((layer.length - 1) * horizontalGap) / 2;

//     nodes.push({
//       id: person._id,
//       type: "imageNode",
//       position: { x, y },
//       data: {
//         id: person._id,
//         name: person.name,
//         relation: person.relation,
//         photo: person.photo,
//         onDelete,
//         isRoot: person._id === root?._id,
//       },
//     });
//   });
// });

//     /* =========================
//        EDGES
//     ========================== */
//     people.forEach(person => {
//       const parents = map[person._id]?.parents || [];

//       parents.forEach(parentId => {
//         if (map[parentId]) {
//           edges.push({
//             id: `e-${parentId}-${person._id}`,
//             source: parentId,
//             target: person._id,
//           });
//         }
//       });
//     });

//     // Marriage link
//     if (groom && bride) {
//       edges.push({
//         id: `marriage-${groom._id}-${bride._id}`,
//         source: groom._id,
//         target: bride._id,
//         type: "smoothstep",
//       });
//     }

//     return { nodes, edges };
//   }, [people, onDelete]);

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };

// export default FamilyGraph;









// // src/components/FamilyGraph.jsx

// import React, { useMemo } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   Handle,
//   Position,
// } from "reactflow";
// import dagre from "dagre";
// import "reactflow/dist/style.css";
// import { BACKEND_URL } from "../config/env";
// import { useState } from "react";

// const nodeWidth = 180;
// const nodeHeight = 150;

// /* ===============================
//    CUSTOM NODE
// ================================ */
// const ImageNode = ({ data }) => {
//   return (
//     <div
//       style={{
//         width: nodeWidth,
//         height: nodeHeight,
//         borderRadius: 16,
//         background: "#fff",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 10,
//         position: "relative",
//       }}
//     >
//       {data.onDelete && !data.isRoot && (
//         <button
//           onClick={() => data.onDelete(data.id)}
//           style={{
//             position: "absolute",
//             top: 5,
//             right: 5,
//             background: "red",
//             color: "#fff",
//             border: "none",
//             borderRadius: "50%",
//             width: 22,
//             height: 22,
//             cursor: "pointer",
//           }}
//         >
//           ×
//         </button>
//       )}

//       <img
//         src={
//           data.photo
//             ? data.photo.startsWith("http")
//               ? data.photo
//               : `${BACKEND_URL}/${data.photo}`
//             : "https://via.placeholder.com/80"
//         }
//         alt={data.name}
//         style={{
//           width: 70,
//           height: 70,
//           borderRadius: "50%",
//           objectFit: "cover",
//           marginBottom: 8,
//         }}
//       />

//       <strong>{data.name}</strong>
//       <span style={{ fontSize: 12, color: "#777" }}>
//         {data.relation}
//       </span>

//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />
//     </div>
//   );
// };

// const nodeTypes = { imageNode: ImageNode };

// /* ===============================
//    DAGRE LAYOUT FUNCTION
// ================================ */
// const getLayoutedElements = (nodes, edges) => {
//   const dagreGraph = new dagre.graphlib.Graph();
//   dagreGraph.setDefaultEdgeLabel(() => ({}));

//   dagreGraph.setGraph({
//     rankdir: "TB", // Top to Bottom layout
//     nodesep: 60,
//     ranksep: 120,
//   });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, {
//       width: nodeWidth,
//       height: nodeHeight,
//     });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     node.position = {
//       x: nodeWithPosition.x - nodeWidth / 2,
//       y: nodeWithPosition.y - nodeHeight / 2,
//     };
//   });

//   return { nodes, edges };
// };

// /* ===============================
//    MAIN COMPONENT
// ================================ */


// const FamilyGraph = ({ people = [], onDelete }) => {
//   const { nodes, edges } = useMemo(() => {
//     if (!people?.length) return { nodes: [], edges: [] };

//     const nodes = [];
//     const edges = [];
//     const map = {};

//     /* NORMALIZE DATA */
//     people.forEach((p) => {
//       let parents = [];

//       if (Array.isArray(p.parents)) {
//         parents = p.parents;
//       } else if (typeof p.parents === "string") {
//         try {
//           parents = JSON.parse(p.parents);
//         } catch {
//           parents = [];
//         }
//       }

//       map[p._id] = { ...p, parents };
//     });

//     /* CREATE NODES */
//     people.forEach((person) => {
//       nodes.push({
//         id: person._id,
//         type: "imageNode",
//         position: { x: 0, y: 0 },
//         data: {
//           id: person._id,
//           name: person.name,
//           relation: person.relation,
//           photo: person.photo,
//           onDelete,
//           isRoot:
//             person.relation?.toLowerCase() === "groom" ||
//             person.relation?.toLowerCase() === "bride",
//         },
//       });
//     });

//     /* CREATE PARENT-CHILD EDGES */
//     people.forEach((person) => {
//       map[person._id]?.parents.forEach((parentId) => {
//         if (map[parentId]) {
//           edges.push({
//             id: `e-${parentId}-${person._id}`,
//             source: parentId,
//             target: person._id,
//             type: "smoothstep",
//           });
//         }
//       });
//     });

//     /* ADD MARRIAGE EDGE */
//     const groom = people.find(
//       (p) => p.relation?.toLowerCase() === "groom"
//     );
//     const bride = people.find(
//       (p) => p.relation?.toLowerCase() === "bride"
//     );

//     if (groom && bride) {
//       edges.push({
//         id: `marriage-${groom._id}-${bride._id}`,
//         source: groom._id,
//         target: bride._id,
//         type: "smoothstep",
//         animated: false,
//       });
//     }

//     return getLayoutedElements(nodes, edges);
//   }, [people, onDelete]);



  
//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };

// export default FamilyGraph;









// src/components/FamilyGraph.jsx
import React, { useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import PersonNode from "./PersonNode";
import dagre from "dagre";
import "reactflow/dist/style.css";

const nodeWidth = 170;
const nodeHeight = 170;

const nodeTypes = {
  person: PersonNode,
};

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: "TB",
    nodesep: 80,
    ranksep: 120,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const position = dagreGraph.node(node.id);
    node.position = {
      x: position.x - nodeWidth / 2,
      y: position.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

export default function FamilyGraph({ people, onDelete }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (!people) return { nodes: [], edges: [] };

    const nodes = [];
    const edges = [];

    people.forEach((person) => {
      nodes.push({
        id: person._id,
        type: "person",
        data: {
          label: `${person.name} (${person.relation})`,
          photo: person.photo,
          onDelete: onDelete, // ✅ use parent delete
        },
        position: { x: 0, y: 0 },
      });

      if (person.parents?.length > 0) {
        person.parents.forEach((parentId) => {
          edges.push({
            id: `${parentId}-${person._id}`,
            source: parentId,
            target: person._id,
          });
        });
      }
    });

    return getLayoutedElements(nodes, edges);
  }, [people, onDelete]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // ✅ IMPORTANT: update when people changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}