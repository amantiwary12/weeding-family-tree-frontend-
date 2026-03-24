// 📄 src/hooks/useFamilyTree.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/env";

axios.defaults.withCredentials = false;

export const useFamilyTree = (weddingCode) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousLength, setPreviousLength] = useState(0);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Fetching people for wedding code:", weddingCode);

      // ✅ IMPROVED WEDDING CODE VALIDATION
      if (
        !weddingCode ||
        weddingCode === "undefined" ||
        weddingCode === "null"
      ) {
        console.log("❌ Invalid wedding code provided:", weddingCode);
        setError("Valid wedding code is required");
        setLoading(false);
        return;
      }

      // ✅ ADDED ERROR HANDLING FOR API CALL
      const url = `${BACKEND_URL}/api/people?weddingCode=${encodeURIComponent(
        weddingCode
      )}`;
      console.log("📡 Making API call to:", url);

      const res = await axios.get(url);
      console.log("✅ API response received, people count:", res.data.length);

      if (res.data.length > previousLength) {
        setTimeout(() => {
          const newMembers = res.data.slice(previousLength);
          newMembers.forEach((member) => {
            const element = document.getElementById(`member-${member._id}`);
            if (element) {
              element.classList.add("animate-zoom-pop");
              setTimeout(() => {
                element.classList.remove("animate-zoom-pop");
              }, 1000);
            }
          });
        }, 100);
      }

      const uniquePeople = [];
      const seen = new Set();

      res.data.forEach((p) => {
        if (p?._id && !seen.has(p._id)) {
          seen.add(p._id);
          uniquePeople.push(p);
        }
      });

      setPeople(uniquePeople);
      setPreviousLength(uniquePeople.length);
    } catch (err) {
      console.error("❌ Failed to fetch people:", err);
      console.error("❌ Error response:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);

      if (err.response?.status === 404) {
        setError("Wedding not found. Please check your wedding code.");
      } else if (err.response?.status === 400) {
        setError("Invalid wedding code format.");
      } else {
       setError("Server is starting... please wait 10 seconds");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/people/${id}`);
      fetchPeople();
      alert("Person deleted successfully!");
    } catch (err) {
      console.error("Failed to delete person", err);
      alert("Failed to delete person.");
    }
  };


  const addPersonRealtime = (newPerson) => {
  setPeople((prev) => {
    // prevent duplicates
    if (prev.find(p => p._id === newPerson._id)) return prev;
    return [...prev, newPerson];
  });
};



  // ✅ IMPROVED USE EFFECT WITH LOADING STATE
  useEffect(() => {
    console.log(
      "🎯 useFamilyTree useEffect triggered with weddingCode:",
      weddingCode
    );

    if (weddingCode && weddingCode !== "undefined" && weddingCode !== "null") {
      fetchPeople();
    } else {
      setLoading(false);
      setError("No wedding code provided");
    }
  }, [weddingCode]);

    return {
    people,
    loading,
    error,
    fetchPeople,
    handleDelete,

      addPersonRealtime, 

    groomSide: people.filter(p => p.side === "groom"),
    brideSide: people.filter(p => p.side === "bride"),

    peopleById: Object.fromEntries(
      people.map(p => [p._id, p])
    ),
  };
};
