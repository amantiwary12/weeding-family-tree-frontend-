



// // 📄 src/pages/TreeView.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { useFamilyTree } from "../hooks/useFamilyTree";
// import { generatePDF } from "../utils/pdfGenerator";
// import DownloadModal from "../components/DownloadModal";
// import TreeHeader from "../components/TreeHeader";
// import SidePanel from "../components/SidePanel";
// import TreeLayout from "../components/TreeLayout";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import QRCodeCanvas from "qrcode.react";
// import { Link } from "react-router-dom";
// import { SCAN_URL, BACKEND_URL } from "../config/env";

// export default function TreeView() {
//   const { people, loading, error, fetchPeople, handleDelete, groomSide, brideSide } = useFamilyTree();
//   const [showDownloadModal, setShowDownloadModal] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [zoomLevel, setZoomLevel] = useState(1);
  
//   const familyTreeRef = useRef(null);
//   const groomSideRef = useRef(null);
//   const brideSideRef = useRef(null);

//   // Auto-zoom effect when members are added - ONLY for tree content
//   useEffect(() => {
//     const totalMembers = groomSide.length + brideSide.length;
    
//     // Calculate zoom level based on member count
//     let newZoom = 1;
//     if (totalMembers > 8) newZoom = 0.9;
//     if (totalMembers > 12) newZoom = 0.85;
//     if (totalMembers > 16) newZoom = 0.8;
//     if (totalMembers > 20) newZoom = 0.75;
//     if (totalMembers > 25) newZoom = 0.7;
//     if (totalMembers > 30) newZoom = 0.65;
    
//     setZoomLevel(newZoom);
//   }, [groomSide.length, brideSide.length]);

//   const handleDownload = async (type) => {
//     setDownloading(true);
    
//     let element, fileName, backgroundColor;
    
//     switch (type) {
//       case 'groom':
//         element = groomSideRef.current;
//         fileName = 'Groom_Family_Tree.pdf';
//         backgroundColor = '#f0f9ff';
//         break;
//       case 'bride':
//         element = brideSideRef.current;
//         fileName = 'Bride_Family_Tree.pdf';
//         backgroundColor = '#fdf2f8';
//         break;
//       case 'complete':
//         element = familyTreeRef.current;
//         fileName = 'Complete_Family_Tree.pdf';
//         backgroundColor = '#f8fafc';
//         break;
//       default:
//         return;
//     }

//     const success = await generatePDF(element, fileName, backgroundColor);
//     setDownloading(false);
    
//     if (success) {
//       setShowDownloadModal(false);
//     } else {
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   const EmptyState = ({ icon, message }) => (
//     <div className="h-full flex items-center justify-center">
//       <div className="text-center animate-fade-in">
//         <div className="text-8xl text-blue-200 mb-4">{icon}</div>
//         <p className="text-blue-400 text-lg font-medium">{message}</p>
//       </div>
//     </div>
//   );

//   if (loading) return <Loader />;

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
//         <Navbar />
//         <div className="text-center">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
//             <div className="text-6xl mb-4">😞</div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Connection Error</h2>
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
//       <DownloadModal
//         isOpen={showDownloadModal}
//         onClose={() => setShowDownloadModal(false)}
//         onDownload={handleDownload}
//         downloading={downloading}
//         groomCount={groomSide.length}
//         brideCount={brideSide.length}
//         totalCount={people.length}
//       />

//       <Navbar />

//       <div className="h-screen flex flex-col pt-1">
//         <TreeHeader
//           totalCount={people.length}
//           groomCount={groomSide.length}
//           brideCount={brideSide.length}
//           onDownloadClick={() => setShowDownloadModal(true)}
//         />

//         {/* ONLY THIS PART WILL ZOOM - Tree Content Area */}
//         <div className="flex-1 overflow-hidden">
//           <div 
//             ref={familyTreeRef}
//             className="flex h-full w-full"
//             style={{
//               transform: `scale(${zoomLevel})`,
//               transformOrigin: 'center center',
//               transition: 'transform 0.5s ease-in-out',
//               height: '100%'
//             }}
//           >
//             {/* Groom Side */}
//             <div className="flex-1 overflow-hidden">
//               <SidePanel
//                 ref={groomSideRef}
//                 side="groom"
//                 title="Groom's Family Tree"
//                 icon="👦"
//                 count={groomSide.length}
//                 gradientFrom="blue"
//                 gradientTo="cyan"
//                 borderColor="blue"
//               >
//                 {groomSide.length === 0 ? (
//                   <EmptyState 
//                     icon="👨‍👦" 
//                     message="Waiting for groom's family members..." 
//                   />
//                 ) : (
//                   <TreeLayout
//                     people={groomSide}
//                     side="groom"
//                     onDelete={handleDelete}
//                     BACKEND_URL={BACKEND_URL}
//                     compact={zoomLevel < 1} // Auto compact when zoomed out
//                   />
//                 )}
//               </SidePanel>
//             </div>

//             {/* Bride Side */}
//             <div className="flex-1 overflow-hidden">
//               <SidePanel
//                 ref={brideSideRef}
//                 side="bride"
//                 title="Bride's Family Tree"
//                 icon="👰"
//                 count={brideSide.length}
//                 gradientFrom="pink"
//                 gradientTo="rose"
//                 borderColor="pink"
//               >
//                 {brideSide.length === 0 ? (
//                   <EmptyState 
//                     icon="👩‍👧" 
//                     message="Waiting for bride's family members..." 
//                   />
//                 ) : (
//                   <TreeLayout
//                     people={brideSide}
//                     side="bride"
//                     onDelete={handleDelete}
//                     BACKEND_URL={BACKEND_URL}
//                     compact={zoomLevel < 1} // Auto compact when zoomed out
//                   />
//                 )}
//               </SidePanel>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* QR Code - NOT affected by zoom */}
//       <div className="fixed bottom-6 right-6 z-50 cursor-pointer animate-bounce-slow">
//         <Link to="/scan">
//           <div className="group relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative p-4 bg-white border-2 border-rose-200 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
//               <QRCodeCanvas 
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
//     </div>
//   );
// }




// 📄 src/pages/TreeView.jsx
import React, { useRef, useState, useEffect } from "react";
import { useFamilyTree } from "../hooks/useFamilyTree";
import { generatePDF } from "../utils/pdfGenerator";
import DownloadModal from "../components/DownloadModal";
import TreeHeader from "../components/TreeHeader";
import SidePanel from "../components/SidePanel";
import TreeLayout from "../components/TreeLayout";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import QRCodeCanvas from "qrcode.react";
import { Link } from "react-router-dom";
import { SCAN_URL, BACKEND_URL } from "../config/env";

export default function TreeView() {
  const { people, loading, error, fetchPeople, handleDelete, groomSide, brideSide } = useFamilyTree();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [groomZoom, setGroomZoom] = useState(1); // Separate zoom for groom
  const [brideZoom, setBrideZoom] = useState(1); // Separate zoom for bride
  
  const familyTreeRef = useRef(null);
  const groomSideRef = useRef(null);
  const brideSideRef = useRef(null);

  // Separate zoom effects for each side
  useEffect(() => {
    // Groom side zoom
    let newGroomZoom = 1;
    if (groomSide.length > 4) newGroomZoom = 0.9;
    if (groomSide.length > 8) newGroomZoom = 0.8;
    if (groomSide.length > 12) newGroomZoom = 0.75;
    if (groomSide.length > 16) newGroomZoom = 0.7;
    if (groomSide.length > 20) newGroomZoom = 0.65;
    
    setGroomZoom(newGroomZoom);
  }, [groomSide.length]);

  useEffect(() => {
    // Bride side zoom
    let newBrideZoom = 1;
    if (brideSide.length > 4) newBrideZoom = 0.9;
    if (brideSide.length > 8) newBrideZoom = 0.8;
    if (brideSide.length > 12) newBrideZoom = 0.75;
    if (brideSide.length > 16) newBrideZoom = 0.7;
    if (brideSide.length > 20) newBrideZoom = 0.65;
    
    setBrideZoom(newBrideZoom);
  }, [brideSide.length]);

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

  const EmptyState = ({ icon, message }) => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="text-8xl text-blue-200 mb-4">{icon}</div>
        <p className="text-blue-400 text-lg font-medium">{message}</p>
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

        {/* Main Tree Container - NO ZOOM HERE */}
        <div ref={familyTreeRef} className="flex-1 flex overflow-hidden">
          {/* Groom Side */}
          <div className="flex-1 flex flex-col overflow-hidden">
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
              {/* Only the tree content inside gets zoomed */}
              <div 
                className="flex-1 overflow-auto"
                style={{
                  transform: `scale(${groomZoom})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.5s ease-in-out',
                  height: '100%'
                }}
              >
                {groomSide.length === 0 ? (
                  <EmptyState 
                    icon="👨‍👦" 
                    message="Waiting for groom's family members..." 
                  />
                ) : (
                  <TreeLayout
                    people={groomSide}
                    side="groom"
                    onDelete={handleDelete}
                    BACKEND_URL={BACKEND_URL}
                    compact={groomZoom < 1}
                  />
                )}
              </div>
            </SidePanel>
          </div>

          {/* Bride Side */}
          <div className="flex-1 flex flex-col overflow-hidden">
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
              {/* Only the tree content inside gets zoomed */}
              <div 
                className="flex-1 overflow-auto"
                style={{
                  transform: `scale(${brideZoom})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.5s ease-in-out',
                  height: '100%'
                }}
              >
                {brideSide.length === 0 ? (
                  <EmptyState 
                    icon="👩‍👧" 
                    message="Waiting for bride's family members..." 
                  />
                ) : (
                  <TreeLayout
                    people={brideSide}
                    side="bride"
                    onDelete={handleDelete}
                    BACKEND_URL={BACKEND_URL}
                    compact={brideZoom < 1}
                  />
                )}
              </div>
            </SidePanel>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="fixed bottom-6 right-6 z-50 cursor-pointer animate-bounce-slow">
        <Link to="/scan">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-4 bg-white border-2 border-rose-200 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
              <QRCodeCanvas 
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