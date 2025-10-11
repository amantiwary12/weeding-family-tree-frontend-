// 📄 src/pages/TreeView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function TreeView() {
  const [people, setPeople] = useState([]);

  // ✅ Fetch people
  const fetchPeople = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/people`);
      setPeople(res.data);
    } catch (err) {
      console.error("Failed to fetch people", err);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // 🗑️ Delete person
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this person?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND}/api/people/${id}`);
      fetchPeople(); // refresh after deletion
    } catch (err) {
      console.error("Failed to delete person", err);
      alert("Failed to delete person.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">👨‍👩‍👧 Wedding Family Tree</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center relative"
          >
            {person.photo_url && (
              <img
                src={`${BACKEND}${person.photo_url}`}
                alt={person.name}
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
            )}
            <h2 className="text-lg font-semibold">{person.name}</h2>
            <p className="text-sm text-gray-600">{person.relation_label}</p>

            <button
              onClick={() => handleDelete(person.id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
