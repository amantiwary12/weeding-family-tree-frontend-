import React, { useEffect, useState } from "react";
import axios from "axios";
import DownloadPDFButton from "../components/DownloadPDFButton.jsx";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react"; // 👈 for QR
// If you prefer `qrcode.react` is already installed

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const FRONTEND = import.meta.env.VITE_APP_URL || "http://localhost:5173";

function PersonCard({ p, onDelete }) {
  return (
    <div className="border rounded p-3 bg-white shadow flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src={
            p.photo_url
              ? `${BACKEND}${p.photo_url}`
              : `https://via.placeholder.com/64?text=${
                  p.name?.charAt(0) || "?"
                }`
          }
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{p.name}</div>
          <div className="text-xs text-gray-500">
            {p.relation_label || p.relation_code}
          </div>
          {p.parent_ids && p.parent_ids.length > 0 && (
            <div className="text-xs text-gray-400">
              Parents: {p.parent_ids.join(", ")}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(p.id)}
        className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1"
      >
        🗑️ Delete
      </button>
    </div>
  );
}

export default function TreeView() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/people`);
      setPeople(res.data);
    } catch (err) {
      console.error("Error fetching people:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;
    try {
      await axios.delete(`${BACKEND}/api/people/${id}`);
      setPeople((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting person:", err);
      alert("Failed to delete person.");
    }
  };

  const bySide = people.reduce((acc, p) => {
    acc[p.side || "other"] = acc[p.side || "other"] || [];
    acc[p.side || "other"].push(p);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 p-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-800 font-semibold"
          >
            🏠 Home
          </Link>

          <DownloadPDFButton
            targetId="tree-container"
            fileName="family-tree.pdf"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6">Family Tree</h2>

        <div id="tree-container">
          <div className="grid grid-cols-2 gap-6">
            {["groom", "bride", "other"].map((sideKey) => (
              <div key={sideKey} className="bg-white p-4 rounded-xl shadow">
                <h3 className="font-semibold mb-4">{sideKey.toUpperCase()}</h3>
                <div className="space-y-3">
                  {(bySide[sideKey] || [])
                    .sort(
                      (a, b) =>
                        (a.parent_ids?.length || 0) -
                        (b.parent_ids?.length || 0)
                    )
                    .map((p) => (
                      <PersonCard key={p.id} p={p} onDelete={handleDelete} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          This is a starter visual. Later we can compute exact node placement
          using parent_ids and draw connectors / PDF export.
        </p>
      </div>

      {/* 🧾 QR Code fixed to bottom-right corner */}
      <div className="fixed bottom-6 right-6 bg-white p-3 rounded-xl shadow-lg flex flex-col items-center">
        <QRCode
          value={`${FRONTEND}/scan`}
          size={140} // ⬅️ increased size here
          level="H"
          includeMargin={true}
        />
        <span className="text-sm mt-2 text-gray-700 font-semibold">
          Scan to Join
        </span>
      </div>
    </div>
  );
}
