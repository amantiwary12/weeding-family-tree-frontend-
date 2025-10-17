// // 📄 src/hooks/useFamilyTree.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const BACKEND_URL = "http://localhost:8000";

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
//               element.classList.add('animate-zoom-pop');
//               setTimeout(() => {
//                 element.classList.remove('animate-zoom-pop');
//               }, 1000);
//             }
//           });
//         }, 100);
//       }
      
//       setPeople(res.data);
//       setPreviousLength(res.data.length);
//     } catch (err) {
//       console.error("Failed to fetch people", err);
//       setError("Failed to load family tree data. Please check if the server is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this person?");
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
//     brideSide: people.filter((p) => p.side?.toLowerCase() === "bride")
//   };
// };







// 📄 src/hooks/useFamilyTree.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/env";

export const useFamilyTree = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousLength, setPreviousLength] = useState(0);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${BACKEND_URL}/api/people`);

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

      setPeople(res.data);
      setPreviousLength(res.data.length);
    } catch (err) {
      console.error("Failed to fetch people", err);
      setError("Failed to load family tree data. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this person?");
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

  useEffect(() => {
    fetchPeople();
  }, []);

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










// // 📄 src/hooks/useFamilyTree.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// // Import BACKEND_URL from config - DON'T declare it again
// import { BACKEND_URL } from '../config/env';

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
//               element.classList.add('animate-zoom-pop');
//               setTimeout(() => {
//                 element.classList.remove('animate-zoom-pop');
//               }, 1000);
//             }
//           });
//         }, 100);
//       }
      
//       setPeople(res.data);
//       setPreviousLength(res.data.length);
//     } catch (err) {
//       console.error("Failed to fetch people", err);
//       setError("Failed to load family tree data. Please check if the server is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this person?");
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
//     brideSide: people.filter((p) => p.side?.toLowerCase() === "bride")
//   };
// };