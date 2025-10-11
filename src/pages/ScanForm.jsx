// 📄 src/pages/ScanForm.jsx
import React, { useState } from "react";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function ScanForm() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !relation) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("relation", relation);
      if (photo) formData.append("photo", photo);

      const response = await axios.post(`${BACKEND}/api/people`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Added:", response.data);
      alert("✅ Family member added successfully!");

      setName("");
      setRelation("");
      setPhoto(null);
    } catch (err) {
      console.error("❌ Error adding member:", err);
      alert("Failed to add family member. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">👨‍👩‍👧 Add Family Member</h2>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Relation*</label>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            required
          >
            <option value="">Select relation</option>
            <option value="Self (Groom/Bride)">Self (Groom/Bride)</option>
            <option value="Groom">Groom</option>
            <option value="Bride">Bride</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Uncle">Uncle</option>
            <option value="Aunt">Aunt</option>
            <option value="Cousin">Cousin</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Member
        </button>
      </form>
    </div>
  );
}
