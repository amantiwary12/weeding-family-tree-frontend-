
// 📄 src/pages/TreeView.jsx
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import FamilyMemberCard from "../components/FamilyMemberCard";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import QRCode from "qrcode.react";
// import { Link } from "react-router-dom";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const BACKEND_URL = "http://localhost:8000";
// const SCAN_URL =
//   (import.meta.env.VITE_APP_URL || "http://localhost:5173") + "/scan";

// export default function TreeView() {
//   const [people, setPeople] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [previousLength, setPreviousLength] = useState(0);
//   const [showDownloadModal, setShowDownloadModal] = useState(false);
//   const [downloading, setDownloading] = useState(false);

//   const familyTreeRef = useRef(null);
//   const groomSideRef = useRef(null);
//   const brideSideRef = useRef(null);

//   const fetchPeople = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axios.get(`${BACKEND_URL}/api/people`);

//       if (res.data.length > previousLength) {
//         setTimeout(() => {
//           const newMembers = res.data.slice(previousLength);
//           newMembers.forEach((member) => {
//             const element = document.getElementById(`member-${member._id}`);
//             if (element) {
//               element.classList.add("animate-zoom-pop");
//               setTimeout(() => {
//                 element.classList.remove("animate-zoom-pop");
//               }, 1000);
//             }
//           });
//         }, 100);
//       }

//       setPeople(res.data);
//       setPreviousLength(res.data.length);
//     } catch (err) {
//       console.error("Failed to fetch people", err);
//       setError(
//         "Failed to load family tree data. Please check if the server is running."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPeople();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this person?"
//     );
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(`${BACKEND_URL}/api/people/${id}`);
//       fetchPeople();
//       alert("Person deleted successfully!");
//     } catch (err) {
//       console.error("Failed to delete person", err);
//       alert("Failed to delete person.");
//     }
//   };

//   // Simple tree layout based on relationships
//   const SimpleTreeLayout = ({ side }) => {
//     const sideMembers = people.filter((p) => p.side?.toLowerCase() === side);

//     // Group by relationship type using the relation field
//     const grandparents = sideMembers.filter(
//       (p) =>
//         p.relation &&
//         (p.relation.toLowerCase().includes("grand") ||
//           p.relation.toLowerCase().includes("grandfather") ||
//           p.relation.toLowerCase().includes("grandmother") ||
//           p.relation.toLowerCase().includes("grandpa") ||
//           p.relation.toLowerCase().includes("grandma"))
//     );

//     const parents = sideMembers.filter(
//       (p) =>
//         p.relation &&
//         (p.relation.toLowerCase().includes("father") ||
//           p.relation.toLowerCase().includes("mother") ||
//           p.relation.toLowerCase().includes("parent") ||
//           p.relation.toLowerCase().includes("dad") ||
//           p.relation.toLowerCase().includes("mom")) &&
//         !grandparents.includes(p)
//     );

//     const children = sideMembers.filter(
//       (p) =>
//         p.relation &&
//         (p.relation.toLowerCase().includes("son") ||
//           p.relation.toLowerCase().includes("daughter") ||
//           p.relation.toLowerCase().includes("child") ||
//           p.relation.toLowerCase().includes("kid"))
//     );

//     const siblings = sideMembers.filter(
//       (p) =>
//         p.relation &&
//         (p.relation.toLowerCase().includes("brother") ||
//           p.relation.toLowerCase().includes("sister") ||
//           p.relation.toLowerCase().includes("sibling"))
//     );

//     const spouses = sideMembers.filter(
//       (p) =>
//         p.relation &&
//         (p.relation.toLowerCase().includes("husband") ||
//           p.relation.toLowerCase().includes("wife") ||
//           p.relation.toLowerCase().includes("spouse"))
//     );

//     const others = sideMembers.filter(
//       (p) =>
//         !grandparents.includes(p) &&
//         !parents.includes(p) &&
//         !children.includes(p) &&
//         !siblings.includes(p) &&
//         !spouses.includes(p)
//     );

//     return (
//       <div className="flex flex-col items-center space-y-8 w-full py-8">
//         {/* Grandparents Level */}
//         {grandparents.length > 0 && (
//           <div className="text-center">
//             <h3 className="text-xl font-semibold text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
//               Grandparents Generation
//             </h3>
//             <div className="flex flex-wrap justify-center gap-6">
//               {grandparents.map((person) => (
//                 <div
//                   key={person._id}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 >
//                   <FamilyMemberCard
//                     person={person}
//                     BACKEND_URL={BACKEND_URL}
//                     onDelete={handleDelete}
//                     showSmallDelete={true}
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* Connection line to next generation */}
//             <div className="w-1 h-12 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mt-6 mx-auto"></div>
//           </div>
//         )}

//         {/* Parents Level */}
//         {parents.length > 0 && (
//           <div className="text-center">
//             <h3 className="text-xl font-semibold text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
//               Parents Generation
//             </h3>
//             <div className="flex flex-wrap justify-center gap-6">
//               {parents.map((person) => (
//                 <div
//                   key={person._id}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 >
//                   <FamilyMemberCard
//                     person={person}
//                     BACKEND_URL={BACKEND_URL}
//                     onDelete={handleDelete}
//                     showSmallDelete={true}
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* Connection line to next generation */}
//             <div className="w-1 h-12 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mt-6 mx-auto"></div>
//           </div>
//         )}

//         {/* Current Generation (Children & Siblings) */}
//         {(children.length > 0 || siblings.length > 0) && (
//           <div className="text-center">
//             <h3 className="text-xl font-semibold text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
//               Current Generation
//             </h3>
//             <div className="flex flex-wrap justify-center gap-6">
//               {children.map((person) => (
//                 <div
//                   key={person._id}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 >
//                   <FamilyMemberCard
//                     person={person}
//                     BACKEND_URL={BACKEND_URL}
//                     onDelete={handleDelete}
//                     showSmallDelete={true}
//                   />
//                 </div>
//               ))}
//               {siblings.map((person) => (
//                 <div
//                   key={person._id}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 >
//                   <FamilyMemberCard
//                     person={person}
//                     BACKEND_URL={BACKEND_URL}
//                     onDelete={handleDelete}
//                     showSmallDelete={true}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Spouses Level */}
//         {spouses.length > 0 && (
//           <div className="text-center">
//             <h3 className="text-xl font-semibold text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
//               Spouses & Partners
//             </h3>
//             <div className="flex flex-wrap justify-center gap-6">
//               {spouses.map((person) => (
//                 <div
//                   key={person._id}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 >
//                   <FamilyMemberCard
//                     person={person}
//                     BACKEND_URL={BACKEND_URL}
//                     onDelete={handleDelete}
//                     showSmallDelete={true}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Others Level */}
//         {others.length > 0 && (
//           <div className="text-center">
//             <h3 className="text-xl font-semibold text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
//               Other Relatives
//             </h3>
//             <div className="flex flex-wrap justify-center gap-6">
//               {others.map((person) => (
//                 <div
//                   key={person._id}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 >
//                   <FamilyMemberCard
//                     person={person}
//                     BACKEND_URL={BACKEND_URL}
//                     onDelete={handleDelete}
//                     showSmallDelete={true}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Download PDF function
//   const downloadPDF = async (type) => {
//     setDownloading(true);

//     try {
//       let element;
//       let fileName;
//       let backgroundColor;

//       switch (type) {
//         case "groom":
//           element = groomSideRef.current;
//           fileName = "Groom_Family_Tree.pdf";
//           backgroundColor = "#f0f9ff";
//           break;
//         case "bride":
//           element = brideSideRef.current;
//           fileName = "Bride_Family_Tree.pdf";
//           backgroundColor = "#fdf2f8";
//           break;
//         case "complete":
//           element = familyTreeRef.current;
//           fileName = "Complete_Family_Tree.pdf";
//           backgroundColor = "#f8fafc";
//           break;
//         default:
//           return;
//       }

//       if (!element) {
//         alert("Element not found for download");
//         return;
//       }

//       // Hide delete buttons
//       const deleteButtons = element.querySelectorAll("button");
//       deleteButtons.forEach((button) => {
//         if (
//           button.textContent.includes("Delete") ||
//           button.textContent.includes("🗑️")
//         ) {
//           button.style.display = "none";
//         }
//       });

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: backgroundColor,
//       });

//       // Restore delete buttons
//       deleteButtons.forEach((button) => {
//         if (
//           button.textContent.includes("Delete") ||
//           button.textContent.includes("🗑️")
//         ) {
//           button.style.display = "";
//         }
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210;
//       const pageHeight = 295;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(fileName);
//       setShowDownloadModal(false);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
//         <Navbar />
//         <div className="text-center">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
//             <div className="text-6xl mb-4">😞</div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Connection Error
//             </h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <button
//               onClick={fetchPeople}
//               className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const groomSide = people.filter((p) => p.side?.toLowerCase() === "groom");
//   const brideSide = people.filter((p) => p.side?.toLowerCase() === "bride");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
//       {/* Download Modal */}
//       {showDownloadModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto transform animate-modal-enter">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl text-white">📥</span>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                 Download Family Tree
//               </h3>
//               <p className="text-gray-600">Choose which section to download</p>
//             </div>

//             <div className="space-y-4">
//               <button
//                 onClick={() => downloadPDF("groom")}
//                 disabled={groomSide.length === 0 || downloading}
//                 className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-2 border-blue-200 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-lg">👦</span>
//                   </div>
//                   <div className="text-left">
//                     <div className="font-semibold text-gray-800">
//                       Groom's Family
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {groomSide.length} members
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-blue-500 group-hover:scale-110 transition-transform">
//                   ⬇️
//                 </div>
//               </button>

//               <button
//                 onClick={() => downloadPDF("bride")}
//                 disabled={brideSide.length === 0 || downloading}
//                 className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border-2 border-pink-200 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-lg">👰</span>
//                   </div>
//                   <div className="text-left">
//                     <div className="font-semibold text-gray-800">
//                       Bride's Family
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {brideSide.length} members
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-pink-500 group-hover:scale-110 transition-transform">
//                   ⬇️
//                 </div>
//               </button>

//               <button
//                 onClick={() => downloadPDF("complete")}
//                 disabled={people.length === 0 || downloading}
//                 className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-2 border-purple-200 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-lg">💍</span>
//                   </div>
//                   <div className="text-left">
//                     <div className="font-semibold text-gray-800">
//                       Complete Tree
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {people.length} total members
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-purple-500 group-hover:scale-110 transition-transform">
//                   ⬇️
//                 </div>
//               </button>
//             </div>

//             {downloading && (
//               <div className="mt-6 text-center">
//                 <div className="inline-flex items-center space-x-2 text-blue-500">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//                   <span>Generating PDF...</span>
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={() => setShowDownloadModal(false)}
//               disabled={downloading}
//               className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <Navbar />

//       <div className="h-screen flex flex-col pt-1 ">
//         {/* Header */}
//         <div className="text-center  px-6 bg-white/80 backdrop-blur-sm border-b border-rose-100/50 z-10">
//           <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
//             <span className="flex items-center space-x-2">
//               {/* <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div> */}
//               <span>Total: {people.length} members</span>
//             </span>
//             <span className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <span>Groom: {groomSide.length}</span>
//             </span>
//             <span className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
//               <span>Bride: {brideSide.length}</span>
//             </span>
//             <div className="flex justify-end m-auto">
//               <button
//                 onClick={() => setShowDownloadModal(true)}
//                 className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
//               >
//                 <span>📥</span>
//                 <span>Download PDF</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Family Tree Structure */}
//         <div ref={familyTreeRef} className="flex-1 flex overflow-hidden">
//           {/* Groom Side */}
//           <div
//             ref={groomSideRef}
//             className="flex-1 flex flex-col border-r border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/60 relative overflow-y-auto"
//           >
//             <div className="text-center py-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-b border-blue-200/30 sticky top-0 z-10">
//               <h2 className="text-3xl font-bold text-blue-700 font-serif flex items-center justify-center space-x-3">
//                 <span className="animate-bounce">👦</span>
//                 <span>Groom's Family Tree</span>
//                 <span className="text-2xl bg-blue-500 text-white px-3 py-1 rounded-full">
//                   {groomSide.length}
//                 </span>
//               </h2>
//             </div>

//             <div className="flex-1">
//               {groomSide.length === 0 ? (
//                 <div className="h-full flex items-center justify-center">
//                   <div className="text-center animate-fade-in">
//                     <div className="text-8xl text-blue-200 mb-4">👨‍👦</div>
//                     <p className="text-blue-400 text-lg font-medium">
//                       Waiting for groom's family members...
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <SimpleTreeLayout side="groom" />
//               )}
//             </div>
//           </div>

//           {/* Bride Side */}
//           <div
//             ref={brideSideRef}
//             className="flex-1 flex flex-col bg-gradient-to-br from-pink-50/80 to-rose-50/60 relative overflow-y-auto"
//           >
//             <div className="text-center py-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-sm border-b border-pink-200/30 sticky top-0 z-10">
//               <h2 className="text-3xl font-bold text-pink-700 font-serif flex items-center justify-center space-x-3">
//                 <span
//                   className="animate-bounce"
//                   style={{ animationDelay: "0.5s" }}
//                 >
//                   👰
//                 </span>
//                 <span>Bride's Family Tree</span>
//                 <span className="text-2xl bg-pink-500 text-white px-3 py-1 rounded-full">
//                   {brideSide.length}
//                 </span>
//               </h2>
//             </div>

//             <div className="flex-1">
//               {brideSide.length === 0 ? (
//                 <div className="h-full flex items-center justify-center">
//                   <div className="text-center animate-fade-in">
//                     <div className="text-8xl text-pink-200 mb-4">👩‍👧</div>
//                     <p className="text-pink-400 text-lg font-medium">
//                       Waiting for bride's family members...
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <SimpleTreeLayout side="bride" />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* QR Code */}
//       <div className="fixed bottom-6 right-6 z-50 cursor-pointer animate-bounce-slow">
//         <Link to="/scan">
//           <div className="group relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative p-4 bg-white border-2 border-rose-200 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
//               <QRCode
//                 value={SCAN_URL}
//                 size={110}
//                 level="H"
//                 includeMargin
//                 fgColor="#be185d"
//                 bgColor="transparent"
//               />
//               <p className="text-xs text-center text-gray-600 mt-2 font-medium">
//                 Scan to Join 💝
//               </p>
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Animation Styles */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes bounce-slow {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         @keyframes modal-enter {
//           0% {
//             transform: scale(0.8) translateY(-20px);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1) translateY(0);
//             opacity: 1;
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-out;
//         }

//         .animate-bounce-slow {
//           animation: bounce-slow 3s infinite;
//         }

//         .animate-modal-enter {
//           animation: modal-enter 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }






// 📄 src/pages/TreeView.jsx
import React, { useRef, useState } from "react";
import { useFamilyTree } from "../hooks/useFamilyTree";
import { generatePDF } from "../utils/pdfGenerator";
import DownloadModal from "../components/DownloadModal";
import TreeHeader from "../components/TreeHeader";
import SidePanel from "../components/SidePanel";
import TreeLayout from "../components/TreeLayout";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";

const SCAN_URL = (import.meta.env.VITE_APP_URL || "http://localhost:5173") + "/scan";
const BACKEND_URL = "http://localhost:8000";

export default function TreeView() {
  const { people, loading, error, fetchPeople, handleDelete, groomSide, brideSide } = useFamilyTree();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const familyTreeRef = useRef(null);
  const groomSideRef = useRef(null);
  const brideSideRef = useRef(null);

  const handleDownload = async (type) => {
    setDownloading(true);
    
    let element, fileName, backgroundColor;
    
    switch (type) {
      case 'groom':
        element = groomSideRef.current;
        fileName = 'Groom_Family_Tree.pdf';
        backgroundColor = '#f0f9ff';
        break;
      case 'bride':
        element = brideSideRef.current;
        fileName = 'Bride_Family_Tree.pdf';
        backgroundColor = '#fdf2f8';
        break;
      case 'complete':
        element = familyTreeRef.current;
        fileName = 'Complete_Family_Tree.pdf';
        backgroundColor = '#f8fafc';
        break;
      default:
        return;
    }

    const success = await generatePDF(element, fileName, backgroundColor);
    setDownloading(false);
    
    if (success) {
      setShowDownloadModal(false);
    } else {
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const EmptyState = ({ icon, message, color }) => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className={`text-8xl text-${color}-200 mb-4`}>{icon}</div>
        <p className={`text-${color}-400 text-lg font-medium`}>{message}</p>
      </div>
    </div>
  );

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connection Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchPeople}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onDownload={handleDownload}
        downloading={downloading}
        groomCount={groomSide.length}
        brideCount={brideSide.length}
        totalCount={people.length}
      />

      <Navbar />

      <div className="h-screen flex flex-col pt-1">
        <TreeHeader
          totalCount={people.length}
          groomCount={groomSide.length}
          brideCount={brideSide.length}
          onDownloadClick={() => setShowDownloadModal(true)}
        />

        <div ref={familyTreeRef} className="flex-1 flex overflow-hidden">
          <SidePanel
            ref={groomSideRef}
            side="groom"
            title="Groom's Family Tree"
            icon="👦"
            count={groomSide.length}
            gradientFrom="blue"
            gradientTo="cyan"
            borderColor="blue"
          >
            {groomSide.length === 0 ? (
              <EmptyState 
                icon="👨‍👦" 
                message="Waiting for groom's family members..." 
                color="blue" 
              />
            ) : (
              <TreeLayout
                people={groomSide}
                side="groom"
                onDelete={handleDelete}
                BACKEND_URL={BACKEND_URL}
              />
            )}
          </SidePanel>

          <SidePanel
            ref={brideSideRef}
            side="bride"
            title="Bride's Family Tree"
            icon="👰"
            count={brideSide.length}
            gradientFrom="pink"
            gradientTo="rose"
            borderColor="pink"
          >
            {brideSide.length === 0 ? (
              <EmptyState 
                icon="👩‍👧" 
                message="Waiting for bride's family members..." 
                color="pink" 
              />
            ) : (
              <TreeLayout
                people={brideSide}
                side="bride"
                onDelete={handleDelete}
                BACKEND_URL={BACKEND_URL}
              />
            )}
          </SidePanel>
        </div>
      </div>

      {/* QR Code */}
      <div className="fixed bottom-6 right-6 z-50 cursor-pointer animate-bounce-slow">
        <Link to="/scan">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-4 bg-white border-2 border-rose-200 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
              <QRCode
                value={SCAN_URL}
                size={110}
                level="H"
                includeMargin
                fgColor="#be185d"
                bgColor="transparent"
              />
              <p className="text-xs text-center text-gray-600 mt-2 font-medium">
                Scan to Join 💝
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}