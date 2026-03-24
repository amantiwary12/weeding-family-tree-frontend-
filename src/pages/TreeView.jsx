// 📄 src/pages/TreeView.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // ✅ VERIFY IMPORT
import { useFamilyTree } from "../hooks/useFamilyTree";
import { useWebSocket } from "../hooks/useWebSocket";
import { generatePDF } from "../utils/pdfGenerator";
import DownloadModal from "../components/DownloadModal";
import TreeHeader from "../components/TreeHeader";
import SidePanel from "../components/SidePanel";
// import FamilyTree from "../components/FamilyTree";
import FamilyGraph from "../components/FamilyGraph";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import QRCodeCanvas from "qrcode.react";
import { FRONTEND_URL, BACKEND_URL } from "../config/env";

export default function TreeView() {
  const { weddingCode } = useParams();

  const {
    people = [],
    loading,
    error,
    fetchPeople,
    handleDelete,
    groomSide = [],
    brideSide = [],
  } = useFamilyTree(weddingCode);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  // const [groomZoom, setGroomZoom] = useState(1);
  // const [brideZoom, setBrideZoom] = useState(1);
  const [weddingInfo, setWeddingInfo] = useState(null);
  const [weddingInfoLoading, setWeddingInfoLoading] = useState(true); // ✅ ADDED

  const familyTreeRef = useRef(null);
  const groomSideRef = useRef(null);
  const brideSideRef = useRef(null);

  const SCAN_URL = weddingCode
    ? `${FRONTEND_URL}/scan/${weddingCode}`
    : FRONTEND_URL;

  // ✅ WEB SOCKET HANDLERS
  const handleNewMember = (newMember) => {
    console.log("🆕 New member added via WebSocket:", newMember);
    addPersonRealtime(newMember);

    const event = new CustomEvent("newMemberAdded", {
      detail: { name: newMember.name, relation: newMember.relation },
    });
    window.dispatchEvent(event);
  };

  const handleMemberDeleted = (memberId) => {
    console.log("🗑️ Member deleted via WebSocket:", memberId);
    fetchPeople();
  };

  // ✅ UPDATED WEBSOCKET USAGE
  const { isConnected } = useWebSocket(
    handleNewMember,
    handleMemberDeleted,
    weddingCode,
  );

  // ✅ UPDATED WEDDING INFO FETCH
  useEffect(() => {
    const fetchWeddingInfo = async () => {
      if (!weddingCode) return;

      setWeddingInfoLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/weddings/${weddingCode}`);
        
        if (response.ok) {
          const data = await response.json();
          setWeddingInfo(data.wedding);
        }
      } catch (error) {
        console.error("Failed to fetch wedding info:", error);
      } finally {
        setWeddingInfoLoading(false);
      }
    };

    fetchWeddingInfo();
  }, [weddingCode]);

  // Notification listener for new members
  useEffect(() => {
    const handleNewMemberNotification = (event) => {
      const { name, relation } = event.detail;
      console.log(`🎉 ${name} (${relation}) just joined the family tree!`);

      // Show UI notification
      const notification = document.getElementById("newMemberNotification");
      if (notification) {
        notification.textContent = `${name} joined as ${relation}`;
        notification.classList.remove("hidden");
        setTimeout(() => {
          notification.classList.add("hidden");
        }, 3000);
      }
    };

    window.addEventListener("newMemberAdded", handleNewMemberNotification);

    return () => {
      window.removeEventListener("newMemberAdded", handleNewMemberNotification);
    };
  }, []);

  // Separate zoom effects for each side
  // useEffect(() => {
  //   // Groom side zoom
  //   let newGroomZoom = 1;
  //   if (groomSide.length > 4) newGroomZoom = 0.9;
  //   if (groomSide.length > 8) newGroomZoom = 0.8;
  //   if (groomSide.length > 12) newGroomZoom = 0.75;
  //   if (groomSide.length > 16) newGroomZoom = 0.7;
  //   if (groomSide.length > 20) newGroomZoom = 0.65;

  //   setGroomZoom(newGroomZoom);
  // }, [groomSide.length]);

  // useEffect(() => {
  //   // Bride side zoom
  //   let newBrideZoom = 1;
  //   if (brideSide.length > 4) newBrideZoom = 0.9;
  //   if (brideSide.length > 8) newBrideZoom = 0.8;
  //   if (brideSide.length > 12) newBrideZoom = 0.75;
  //   if (brideSide.length > 16) newBrideZoom = 0.7;
  //   if (brideSide.length > 20) newBrideZoom = 0.65;

  //   setBrideZoom(newBrideZoom);
  // }, [brideSide.length]);

  const handleDownload = async (type) => {
    setDownloading(true);

    let element, fileName, backgroundColor;

    switch (type) {
      case "groom":
        element = groomSideRef.current;
        fileName = weddingInfo
          ? `${weddingInfo.groomName}_Family_Tree.pdf`
          : "Groom_Family_Tree.pdf";
        backgroundColor = "#f0f9ff";
        break;
      case "bride":
        element = brideSideRef.current;
        fileName = weddingInfo
          ? `${weddingInfo.brideName}_Family_Tree.pdf`
          : "Bride_Family_Tree.pdf";
        backgroundColor = "#fdf2f8";
        break;
      case "complete":
        element = familyTreeRef.current;
        fileName = weddingInfo
          ? `${weddingInfo.groomName}_${weddingInfo.brideName}_Family_Tree.pdf`
          : "Complete_Family_Tree.pdf";
        backgroundColor = "#f8fafc";
        break;
      default:
        return;
    }

    const success = await generatePDF(element, fileName, backgroundColor);
    setDownloading(false);

    if (success) {
      setShowDownloadModal(false);
    } else {
      alert("Failed to generate PDF. Please try again.");
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

  // ✅ SHOW ERROR IF NO WEDDING CODE
  if (!weddingCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Wedding Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              Please check your wedding URL or create a new wedding.
            </p>
            <Link
              to="/create-wedding"
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block"
            >
              Create New Wedding
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Connection Error
            </h2>
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

      {/* ✅ UPDATED WEDDING INFO HEADER */}
      {weddingInfoLoading ? (
        <div className="bg-white/80 backdrop-blur-sm border-b border-rose-100/50 py-3 px-6 text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      ) : weddingInfo ? (
        <div className="bg-white/80 backdrop-blur-sm border-b border-rose-100/50 py-3 px-6 text-center">
          <h1 className="text-xl font-bold text-gray-800 font-serif">
            {weddingInfo.groomName} 💍 {weddingInfo.brideName}
          </h1>
          <p className="text-sm text-gray-600">
            Wedding Code:{" "}
            <span className="font-mono font-bold text-rose-600">
              {weddingCode}
            </span>
            {weddingInfo.weddingDate &&
              ` • ${new Date(weddingInfo.weddingDate).toLocaleDateString()}`}
          </p>
        </div>
      ) : null}

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
              title={
                weddingInfo
                  ? `${weddingInfo.groomName}'s Family`
                  : "Groom's Family Tree"
              }
              // icon="👦"
              count={groomSide.length}
              gradientFrom="blue"
              gradientTo="cyan"
              borderColor="blue"
            >
              {/* Only the tree content inside gets zoomed */}
              <div
                className="flex-1 overflow-auto"
                // style={{
                //   // transform: `scale(${groomZoom})`,
                //   transformOrigin: "top center",
                //   transition: "transform 0.5s ease-in-out",
                //   height: "100%",
                // }}
                style={{
                  height: "100%",
                }}
              >
                {groomSide.length === 0 ? (
                  <EmptyState
                    icon="👨‍👦"
                    message="Waiting for groom's family members..."
                  />
                ) : (
                  <FamilyGraph
                    people={groomSide}
                    side="groom"
                    rootPerson={{
                      _id: "groom-root",
                      name: weddingInfo?.groomName,
                      relation: "Groom",
                      photo: null,
                    }}
                    onDelete={handleDelete}
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
              title={
                weddingInfo
                  ? `${weddingInfo.brideName}'s Family`
                  : "Bride's Family Tree"
              }
              // icon="👰"
              count={brideSide.length}
              gradientFrom="pink"
              gradientTo="rose"
              borderColor="pink"
            >
              {/* Only the tree content inside gets zoomed */}
              <div
                className="flex-1 overflow-auto"
                // style={{
                //   // transform: `scale(${brideZoom})`,
                //   transformOrigin: "top center",
                //   transition: "transform 0.5s ease-in-out",
                //   height: "100%",
                // }}
                style={{
                  height: "100%",
                }}
              >
                {brideSide.length === 0 ? (
                  <EmptyState
                    icon="👩‍👧"
                    message="Waiting for bride's family members..."
                  />
                ) : (
                  <FamilyGraph
                    people={brideSide}
                    side="bride"
                    rootPerson={{
                      _id: "bride-root",
                      name: weddingInfo?.brideName,
                      relation: "Bride",
                      photo: null,
                    }}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </SidePanel>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="fixed bottom-6 right-6 z-50 cursor-pointer animate-bounce-slow">
        <Link to={weddingCode ? `/scan/${weddingCode}` : "/scan"}>
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
              {/* {weddingCode && (
                <p className="text-xs text-center text-rose-600 mt-1 font-bold">
                  {weddingCode}
                </p>
              )} */}
            </div>
          </div>
        </Link>
      </div>

      {/* ✅ Real-time notification badge */}
      <div className="fixed top-24 right-6 z-50">
        <div
          id="newMemberNotification"
          className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse hidden transition-all duration-300"
        >
          New member joined!
        </div>
      </div>
    </div>
  );
}
