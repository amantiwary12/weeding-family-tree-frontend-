// // 📄 src/hooks/useFamilyTree.js
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config/env";
// import { io } from "socket.io-client";


// // ✅ Add this line:
// axios.defaults.withCredentials = true;    

// export const useFamilyTree = () => {
//   const [people, setPeople] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [previousLength, setPreviousLength] = useState(0);

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

//   useEffect(() => {
//     fetchPeople();
//   }, []);

//   return {
//     people,
//     loading,
//     error,
//     fetchPeople,
//     handleDelete,
//     groomSide: people.filter((p) => p.side?.toLowerCase() === "groom"),
//     brideSide: people.filter((p) => p.side?.toLowerCase() === "bride"),
//   };
// };

// src/hooks/useFamilyTree.js
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/env";
import { io } from "socket.io-client";

axios.defaults.withCredentials = true;

export const useFamilyTree = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevIdsRef = useRef(new Set());
  const socketRef = useRef(null);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/people`);
      setPeople(res.data || []);
      // cache ids to avoid duplicates when socket sends same person
      prevIdsRef.current = new Set((res.data || []).map(p => p._id));
    } catch (err) {
      console.error("Failed to fetch people", err);
      setError("Failed to load family tree data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();

    // Connect socket to backend base URL (no /api)
    const socket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // When backend emits new person
    socket.on("personAdded", (newPerson) => {
      if (!newPerson || !newPerson._id) return;
      // avoid duplicate if already present
      if (!prevIdsRef.current.has(newPerson._id)) {
        setPeople(prev => {
          const next = [...prev, newPerson];
          prevIdsRef.current.add(newPerson._id);
          return next;
        });
      } else {
        // optional: refresh the list to ensure latest ordering/data
        // fetchPeople();
      }
    });

    socket.on("personDeleted", (deletedId) => {
      if (!deletedId) return;
      setPeople(prev => {
        const next = prev.filter(p => p._id !== deletedId);
        prevIdsRef.current.delete(deletedId);
        return next;
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket connect_error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this person?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/people/${id}`);
      // No need to call fetchPeople(); backend emits personDeleted and socket handler will update UI.
    } catch (err) {
      console.error("Failed to delete person", err);
      alert("Failed to delete person.");
    }
  };

  return {
    people,
    loading,
    error,
    fetchPeople,
    handleDelete,
    groomSide: people.filter((p) => p.side?.toLowerCase() === "groom"),
    brideSide: people.filter((p) => p.side?.toLowerCase() === "bride"),
  };
};







