//createwedding.jsx
import React, { useState, useEffect } from "react"; // Add useEffect
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/env";

export default function CreateWedding() {
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    createdBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [wedding, setWedding] = useState(null);
  const [error, setError] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("Checking connection..."); 
  const navigate = useNavigate();

  // ADD THIS USEFFECT TO TEST CONNECTION
  useEffect(() => {
    const testConnection = async () => {
      try {
        // console.log("🔗 Testing connection to:", BACKEND_URL);
        // const response = await axios.get(`${BACKEND_URL}/api/health`);
        // setConnectionStatus(`✅ Connected to backend`);
        // console.log("✅ Backend connection successful:", response.data);
      } catch (error) {
        console.log(error.message)
      }
    };

    testConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📨 Sending wedding creation request...");

      const res = await axios.post(`${BACKEND_URL}/api/weddings`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      });

      console.log("✅ Wedding created successfully:", res.data);

      if (res.data.success) {
        setWedding(res.data.wedding);
      } else {
        throw new Error(res.data.error || "Failed to create wedding");
      }
    } catch (err) {
      console.error("❌ Wedding creation error:", err);

      let errorMessage = "Failed to create wedding";

      if (err.response) {
        // Server responded with error status
        errorMessage =
          err.response.data?.error ||
          err.response.data?.message ||
          `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request made but no response received
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Something else happened
        errorMessage = err.message;
      }

      setError(errorMessage);
      alert("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (wedding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Wedding Created!
          </h1>

          <div className="bg-rose-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Wedding Code:</p>
            <p className="text-3xl font-bold text-rose-600 font-mono">
              {wedding.code}
            </p>
          </div>

          <div className="space-y-3 text-left mb-6">
            <p>
              <strong>Groom:</strong> {wedding.groomName}
            </p>
            <p>
              <strong>Bride:</strong> {wedding.brideName}
            </p>
            <p>
              <strong>Share URL:</strong>
            </p>
            <p className="text-blue-600 break-all text-sm">
              {wedding.shareUrl}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate(`/tree/${wedding.code}`)}
              className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all"
            >
              Go to Family Tree
            </button>
            <button
              onClick={() => {
                setWedding(null);
                setFormData({
                  groomName: "",
                  brideName: "",
                  weddingDate: "",
                  createdBy: "",
                });
              }}
              className="w-full bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Wedding
          </h1>
          <p className="text-gray-600">Set up your family tree</p>
        </div>
        {/* ADD THIS DEBUG INFO */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Backend:</strong> {BACKEND_URL}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            <strong>Status:</strong> {connectionStatus}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Groom's Name *
            </label>
            <input
              type="text"
              name="groomName"
              value={formData.groomName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter groom's full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Bride's Name *
            </label>
            <input
              type="text"
              name="brideName"
              value={formData.brideName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter bride's full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Wedding Date
            </label>
            <input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Your Name/Email
            </label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Who's creating this?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
            }`}
          >
            {loading ? "Creating..." : "Create Wedding"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-rose-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
