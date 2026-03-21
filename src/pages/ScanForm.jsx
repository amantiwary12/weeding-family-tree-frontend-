// //pages/scanform.jsx
// import React, { useState, useEffect  } from "react";
// import axios from "axios";
// // import pay from "../../assets/payment10.jpg"; // GPay QR code image
// import { BACKEND_URL } from "../config/env";
// import { useParams } from "react-router-dom"; // ✅ ADD THIS
// import { Link } from "react-router-dom"; // ✅ Add this at top

// export default function ScanForm() {
//   const { weddingCode } = useParams(); // ✅ ADD THIS
//   const [name, setName] = useState("");
//   const [relation, setRelation] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [side, setSide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false); // ✅ new state for showing payment after submit
//   const [parents, setParents] = useState([]);
//   const [people, setPeople] = useState([]);



// // formData.append("parents", JSON.stringify(parents));



//   // ✅ COMPLETE RELATIONSHIP OPTIONS
//   const relationshipOptions = [
//     // Core Couple
//     { value: "Groom", label: "Groom (Husband)" },
//     { value: "Bride", label: "Bride (Wife)" },

//     // Immediate Family
//     { value: "Father", label: "Father" },
//     { value: "Mother", label: "Mother" },
//     { value: "Son", label: "Son" },
//     { value: "Daughter", label: "Daughter" },

//     // Siblings
//     { value: "Brother", label: "Brother" },
//     { value: "Sister", label: "Sister" },
//     { value: "Elder Brother", label: "Elder Brother" },
//     { value: "Younger Brother", label: "Younger Brother" },
//     { value: "Elder Sister", label: "Elder Sister" },
//     { value: "Younger Sister", label: "Younger Sister" },

//     // Parents' Siblings
//     { value: "Uncle (Father's Brother)", label: "Uncle (Father's Brother)" },
//     { value: "Uncle (Mother's Brother)", label: "Uncle (Mother's Brother)" },
//     { value: "Aunt (Father's Sister)", label: "Aunt (Father's Sister)" },
//     { value: "Aunt (Mother's Sister)", label: "Aunt (Mother's Sister)" },

//     // Grandparents
//     {
//       value: "Grandfather (Father's Father)",
//       label: "Grandfather (Father's Father)",
//     },
//     {
//       value: "Grandfather (Mother's Father)",
//       label: "Grandfather (Mother's Father)",
//     },
//     {
//       value: "Grandmother (Father's Mother)",
//       label: "Grandmother (Father's Mother)",
//     },
//     {
//       value: "Grandmother (Mother's Mother)",
//       label: "Grandmother (Mother's Mother)",
//     },

//     // Cousins
//     { value: "Cousin (Uncle's Son)", label: "Cousin (Uncle's Son)" },
//     { value: "Cousin (Uncle's Daughter)", label: "Cousin (Uncle's Daughter)" },
//     { value: "Cousin (Aunt's Son)", label: "Cousin (Aunt's Son)" },
//     { value: "Cousin (Aunt's Daughter)", label: "Cousin (Aunt's Daughter)" },

//     // Nieces & Nephews
//     { value: "Nephew (Brother's Son)", label: "Nephew (Brother's Son)" },
//     {
//       value: "Niece (Brother's Daughter)",
//       label: "Niece (Brother's Daughter)",
//     },
//     { value: "Nephew (Sister's Son)", label: "Nephew (Sister's Son)" },
//     { value: "Niece (Sister's Daughter)", label: "Niece (Sister's Daughter)" },

//     // In-Laws
//     { value: "Father-in-law", label: "Father-in-law" },
//     { value: "Mother-in-law", label: "Mother-in-law" },
//     { value: "Brother-in-law", label: "Brother-in-law" },
//     { value: "Sister-in-law", label: "Sister-in-law" },
//     { value: "Son-in-law", label: "Son-in-law" },
//     { value: "Daughter-in-law", label: "Daughter-in-law" },

//     // Great Grandparents
//     { value: "Great Grandfather", label: "Great Grandfather" },
//     { value: "Great Grandmother", label: "Great Grandmother" },

//     // Step Relations
//     { value: "Step Father", label: "Step Father" },
//     { value: "Step Mother", label: "Step Mother" },
//     { value: "Step Brother", label: "Step Brother" },
//     { value: "Step Sister", label: "Step Sister" },
//     { value: "Step Son", label: "Step Son" },
//     { value: "Step Daughter", label: "Step Daughter" },

//     // Other Important
//     { value: "Godfather", label: "Godfather" },
//     { value: "Godmother", label: "Godmother" },
//     { value: "Family Friend", label: "Family Friend" },
//     { value: "Close Friend", label: "Close Friend" },
//     { value: "Best Friend", label: "Best Friend" },

//     // Extended
//     { value: "Grand Uncle", label: "Grand Uncle" },
//     { value: "Grand Aunt", label: "Grand Aunt" },
//     { value: "Second Cousin", label: "Second Cousin" },
//     { value: "Distant Relative", label: "Distant Relative" },

//     // Custom
//     { value: "Other Relative", label: "Other Relative" },
//     { value: "Self", label: "Self (Adding Myself)" },
//   ];

//   // ////////////////////////////////////////////////////////////////////////////////////

//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     setLoading(true);

//     if (!name || !relation || !side || !weddingCode) {

//       // ✅ Prevent multiple Groom
// if (relation === "Groom") {
//   const groomExists = people.find(
//     (p) => p.relation?.toLowerCase() === "groom"
//   );

//   if (groomExists) {
//     alert("Only one Groom is allowed in the tree.");
//     setLoading(false);
//     return;
//   }
// }


// // Groom & Bride must not have parents
// if (relation === "Groom" || relation === "Bride") {
//   if (parents.length > 0) {
//     alert("Groom or Bride cannot have parents selected.");
//     setLoading(false);
//     return;
//   }
// }

// // ✅ Prevent multiple Bride
// if (relation === "Bride") {
//   const brideExists = people.find(
//     (p) => p.relation?.toLowerCase() === "bride"
//   );

//   if (brideExists) {
//     alert("Only one Bride is allowed in the tree.");
//     setLoading(false);
//     return;
//   }
// }
//       // ✅ ADD WEDDING CODE CHECK
//       alert(
//         "Please fill all required fields and ensure wedding code is present"
//       );
//       setLoading(false);
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("relation", relation);
//       formData.append("side", side);
//       formData.append("weddingCode", weddingCode); // ✅ ADD WEDDING CODE
//       if (photo) formData.append("photo", photo);

//       formData.append("parents", JSON.stringify(parents));

//       const res = await axios.post(`${BACKEND_URL}/api/people`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("✅ Added:", res.data);
//       alert("✅ Family member added successfully!");
//       await axios.get(
//   `${BACKEND_URL}/api/people?weddingCode=${weddingCode}`
// ).then(res => setPeople(res.data));

// window.location.href = `/tree/${weddingCode}`;

//       setName("");
//       setRelation("");
//       setSide("");
//       setPhoto(null);
//       document.getElementById("photo-input").value = "";

//       // ✅ show payment section
//       setFormSubmitted(true);
//     } catch (err) {
//       console.error("❌ Error adding member:", err);
//       const message =
//         err.response?.data?.error || err.message || "Failed to add member";
//       alert(`Error: ${message}`);
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ✅ ADD WEDDING CODE VALIDATION
//   if (!weddingCode) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
//         <div className="bg-white rounded-2xl p-8 text-center max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Invalid Wedding Link
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Please use a valid wedding QR code or link
//           </p>
//           <Link to="/" className="text-rose-600 hover:underline">
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }


//   useEffect(() => {
//   const fetchPeople = async () => {
//     try {
//       const res = await axios.get(
//         `${BACKEND_URL}/api/people?weddingCode=${weddingCode}`
//       );
//       setPeople(res.data);
//     } catch (err) {
//       console.error("Failed to fetch people", err);
//     }
//   };

//   if (weddingCode) {
//     fetchPeople();
//   }
// }, [weddingCode]);



//   // ✅ GPay details
//   // const upiLink =
//   //   "upi://pay?pa=amantiwary2505@okhdfcbank&pn=Aman%20Tiwary&cu=INR";
//   // const handlePayClick = () => {
//   //   window.location.href = upiLink;
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex flex-col items-center justify-center p-6 space-y-8">
//       {!formSubmitted ? (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-rose-100"
//         >
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
//               👨‍👩‍👧‍👦 Add Family Member
//             </h2>
//             <p className="text-gray-600">Join our family tree</p>
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your full name"
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
//               required
//             />
//           </div>

//           {/* Family Side */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Family Side *
//             </label>
//             <select
//               value={side}
//               onChange={(e) => setSide(e.target.value)}
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
//               required
//             >
//               <option value="">Select which family side</option>
//               <option value="groom">Groom's Side</option>
//               <option value="bride">Bride's Side</option>
//             </select>
//           </div>

//           {/* Relationship - COMPLETE LIST */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Relationship to Couple *
//             </label>
//             <select
//               value={relation}
//               onChange={(e) => {
//   const value = e.target.value;
//   setRelation(value);

//   if (value === "Groom") setSide("groom");
//   if (value === "Bride") setSide("bride");
// }}
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
//               required
//             >
//               <option value="">Select your relationship</option>

//               {/* Grouped Options */}
//               <optgroup label="🎩 Core Couple">
//                 <option value="Groom">Groom (Husband)</option>
//                 <option value="Bride">Bride (Wife)</option>
//               </optgroup>

//               <optgroup label="👨‍👩‍👧‍👦 Immediate Family">
//                 <option value="Father">Father</option>
//                 <option value="Mother">Mother</option>
//                 <option value="Son">Son</option>
//                 <option value="Daughter">Daughter</option>
//               </optgroup>

//               <optgroup label="👫 Siblings">
//                 <option value="Brother">Brother</option>
//                 <option value="Sister">Sister</option>
//                 <option value="Elder Brother">Elder Brother</option>
//                 <option value="Younger Brother">Younger Brother</option>
//                 <option value="Elder Sister">Elder Sister</option>
//                 <option value="Younger Sister">Younger Sister</option>
//               </optgroup>

//               <optgroup label="👴👵 Grandparents">
//                 <option value="Grandfather (Father's Father)">
//                   Grandfather (Father's Father)
//                 </option>
//                 <option value="Grandfather (Mother's Father)">
//                   Grandfather (Mother's Father)
//                 </option>
//                 <option value="Grandmother (Father's Mother)">
//                   Grandmother (Father's Mother)
//                 </option>
//                 <option value="Grandmother (Mother's Mother)">
//                   Grandmother (Mother's Mother)
//                 </option>
//               </optgroup>

//               <optgroup label="🧔👱‍♀️ Aunts & Uncles">
//                 <option value="Uncle (Father's Brother)">
//                   Uncle (Father's Brother)
//                 </option>
//                 <option value="Uncle (Mother's Brother)">
//                   Uncle (Mother's Brother)
//                 </option>
//                 <option value="Aunt (Father's Sister)">
//                   Aunt (Father's Sister)
//                 </option>
//                 <option value="Aunt (Mother's Sister)">
//                   Aunt (Mother's Sister)
//                 </option>
//               </optgroup>

//               <optgroup label="👨‍👧‍👦 Cousins">
//                 <option value="Cousin (Uncle's Son)">
//                   Cousin (Uncle's Son)
//                 </option>
//                 <option value="Cousin (Uncle's Daughter)">
//                   Cousin (Uncle's Daughter)
//                 </option>
//                 <option value="Cousin (Aunt's Son)">Cousin (Aunt's Son)</option>
//                 <option value="Cousin (Aunt's Daughter)">
//                   Cousin (Aunt's Daughter)
//                 </option>
//               </optgroup>

//               <optgroup label="👶 Nieces & Nephews">
//                 <option value="Nephew (Brother's Son)">
//                   Nephew (Brother's Son)
//                 </option>
//                 <option value="Niece (Brother's Daughter)">
//                   Niece (Brother's Daughter)
//                 </option>
//                 <option value="Nephew (Sister's Son)">
//                   Nephew (Sister's Son)
//                 </option>
//                 <option value="Niece (Sister's Daughter)">
//                   Niece (Sister's Daughter)
//                 </option>
//               </optgroup>

//               <optgroup label="💑 In-Laws">
//                 <option value="Father-in-law">Father-in-law</option>
//                 <option value="Mother-in-law">Mother-in-law</option>
//                 <option value="Brother-in-law">Brother-in-law</option>
//                 <option value="Sister-in-law">Sister-in-law</option>
//                 <option value="Son-in-law">Son-in-law</option>
//                 <option value="Daughter-in-law">Daughter-in-law</option>
//               </optgroup>

//               <optgroup label="👴👵 Great Grandparents">
//                 <option value="Great Grandfather">Great Grandfather</option>
//                 <option value="Great Grandmother">Great Grandmother</option>
//               </optgroup>

//               <optgroup label="👥 Step Family">
//                 <option value="Step Father">Step Father</option>
//                 <option value="Step Mother">Step Mother</option>
//                 <option value="Step Brother">Step Brother</option>
//                 <option value="Step Sister">Step Sister</option>
//                 <option value="Step Son">Step Son</option>
//                 <option value="Step Daughter">Step Daughter</option>
//               </optgroup>

//               <optgroup label="🤝 Other Relations">
//                 <option value="Godfather">Godfather</option>
//                 <option value="Godmother">Godmother</option>
//                 <option value="Family Friend">Family Friend</option>
//                 <option value="Close Friend">Close Friend</option>
//                 <option value="Best Friend">Best Friend</option>
//                 <option value="Grand Uncle">Grand Uncle</option>
//                 <option value="Grand Aunt">Grand Aunt</option>
//                 <option value="Second Cousin">Second Cousin</option>
//                 <option value="Distant Relative">Distant Relative</option>
//               </optgroup>

//               <optgroup label="➕ Other">
//                 <option value="Other Relative">Other Relative</option>
//                 <option value="Self">Self (Adding Myself)</option>
//               </optgroup>
//             </select>
//           </div>

// {/* Select Parents */}
// <div>
//   <label className="block text-gray-700 font-semibold mb-2">
//     Select Parents (Optional)
//   </label>

//   <select
//     multiple
//     value={parents}
//     onChange={(e) =>
//       setParents(
//         Array.from(e.target.selectedOptions, (option) => option.value)
//       )
//     }
//     className="w-full border border-gray-300 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-rose-500"
//   >
//     {people
//   .filter(
//     (p) =>
//       p.side === side &&
//       p.relation !== "Groom" &&
//       p.relation !== "Bride"
//   ) // only same family side
//       .map((p) => (
//         <option key={p._id} value={p._id}>
//           {p.name} ({p.relation})
//         </option>
//       ))}
//   </select>

//   <p className="text-xs text-gray-500 mt-1">
//     Hold CTRL (Windows) or CMD (Mac) to select multiple parents
//   </p>
// </div>



//           {/* Photo */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Photo (Optional)
//             </label>
//             <input
//               id="photo-input"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setPhoto(e.target.files[0])}
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
//             />
//             {photo && (
//               <p className="text-sm text-green-600 mt-2">
//                 ✅ Selected: {photo.name}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-lg"
//             }`}
//           >
//             {loading ? "Adding..." : "➕ Add Me to Family Tree"}
//           </button>
//         </form>
//       ) : (
//         // Payment section remains same
//         <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-center border border-rose-100">
//           {/* ... payment section ... */}
//         </div>
//       )}
//     </div>
//   );
// }






// src/pages/ScanForm.jsx


// src/pages/ScanForm.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/env";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ScanForm() {
  const { weddingCode } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [side, setSide] = useState("");
  const [parents, setParents] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  /* ===============================
      FETCH PEOPLE
  =============================== */
  useEffect(() => {
    if (!weddingCode) return;

    const fetchPeople = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/people?weddingCode=${weddingCode}`
        );
        setPeople(res.data);
      } catch (err) {
        console.error("Failed to fetch people:", err);
      }
    };

    fetchPeople();
  }, [weddingCode]);

  /* ===============================
      CLEANUP CAMERA ON UNMOUNT
  =============================== */
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  /* ===============================
      START CAMERA
  =============================== */
  const startCamera = async () => {
    setShowCamera(true);
    setCameraActive(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } // Use "environment" for back camera
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
      setShowCamera(false);
      setCameraActive(false);
    }
  };

  /* ===============================
      CAPTURE PHOTO FROM CAMERA
  =============================== */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create file from blob
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        setPhoto(file);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(blob);
        setPhotoPreview(previewUrl);
        
        // Stop camera
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
        setCameraActive(false);
      }, 'image/jpeg', 0.9);
    }
  };

  /* ===============================
      STOP CAMERA
  =============================== */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setCameraActive(false);
  };

  /* ===============================
      HANDLE FILE UPLOAD
  =============================== */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  /* ===============================
      REMOVE PHOTO
  =============================== */
  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (document.getElementById("photo-input")) {
      document.getElementById("photo-input").value = "";
    }
  };

  /* ===============================
      HANDLE SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* -------- REQUIRED VALIDATION -------- */
    if (!name || !relation || !side || !weddingCode) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    /* -------- PREVENT MULTIPLE GROOM -------- */
    if (relation === "Groom") {
      const groomExists = people.find(
        (p) => p.relation?.toLowerCase() === "groom"
      );

      if (groomExists) {
        alert("Only one Groom is allowed.");
        setLoading(false);
        return;
      }

      if (parents.length > 0) {
        alert("Groom cannot have parents selected.");
        setLoading(false);
        return;
      }
    }

    /* -------- PREVENT MULTIPLE BRIDE -------- */
    if (relation === "Bride") {
      const brideExists = people.find(
        (p) => p.relation?.toLowerCase() === "bride"
      );

      if (brideExists) {
        alert("Only one Bride is allowed.");
        setLoading(false);
        return;
      }

      if (parents.length > 0) {
        alert("Bride cannot have parents selected.");
        setLoading(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("relation", relation);
      formData.append("side", side);
      formData.append("weddingCode", weddingCode);
      formData.append("parents", JSON.stringify(parents));

      if (photo) {
        formData.append("photo", photo);
      }

      await axios.post(`${BACKEND_URL}/api/people`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Family member added successfully!");

      // Refresh people
      const updated = await axios.get(
        `${BACKEND_URL}/api/people?weddingCode=${weddingCode}`
      );
      setPeople(updated.data);

      // Reset form
      setName("");
      setRelation("");
      setSide("");
      setParents([]);
      setPhoto(null);
      setPhotoPreview(null);
      if (document.getElementById("photo-input")) {
        document.getElementById("photo-input").value = "";
      }

      setFormSubmitted(true);

      // Navigate safely
      navigate(`/tree/${weddingCode}`);
    } catch (err) {
      console.error("Error adding member:", err);
      alert(err.response?.data?.error || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
      INVALID LINK
  =============================== */
  if (!weddingCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold mb-3">Invalid Wedding Link</h2>
          <p className="text-gray-600 mb-4">
            Please use a valid wedding QR link.
          </p>
          <Link to="/" className="text-rose-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ===============================
      UI
  =============================== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 p-6">
      {!formSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">
            👨‍👩‍👧 Add Family Member
          </h2>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />

          {/* Side */}
          <select
            value={side}
            onChange={(e) => setSide(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
            required
          >
            <option value="">Select Side</option>
            <option value="groom">Groom's Side</option>
            <option value="bride">Bride's Side</option>
          </select>

          {/* Relation */}
          <select
            value={relation}
            onChange={(e) => {
              const value = e.target.value;
              setRelation(value);
              if (value === "Groom") setSide("groom");
              if (value === "Bride") setSide("bride");
            }}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
            required
          >
            <option value="">Select Relationship</option>
            <option value="Groom">Groom</option>
            <option value="Bride">Bride</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Grandfather">Grandfather</option>
            <option value="Grandmother">Grandmother</option>
            <option value="Uncle">Uncle</option>
            <option value="Aunt">Aunt</option>
            <option value="Cousin">Cousin</option>
            <option value="In-Law">In-Law</option>
            <option value="Friend">Friend</option>
          </select>

          {/* Parents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parents (Optional - hold Ctrl/Cmd to select multiple)
            </label>
            <select
              multiple
              value={parents}
              onChange={(e) =>
                setParents(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="w-full border rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-rose-500"
            >
              {people
                .filter((p) => p.side === side)
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.relation})
                  </option>
                ))}
            </select>
          </div>

          {/* Photo Section with both options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            
            {/* Photo Preview */}
            {photoPreview && (
              <div className="mb-3 relative">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-rose-200"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Camera Button */}
            {!showCamera && !photoPreview && (
              <button
                type="button"
                onClick={startCamera}
                className="w-full mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                📸 Take Photo with Camera
              </button>
            )}

            {/* Camera View */}
            {showCamera && (
              <div className="mb-3">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg border-2 border-rose-200"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    📷 Capture
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            )}

            {/* File Upload Option */}
            {!showCamera && (
              <div>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full border rounded-xl px-4 py-3"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Or choose from gallery
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add to Family Tree"}
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold mb-3">🎉 Member Added Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Redirecting you to the family tree...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
        </div>
      )}
    </div>
  );
}












// flip camera option // src/pages/ScanForm.jsx

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config/env";
// import { useParams, Link, useNavigate } from "react-router-dom";

// export default function ScanForm() {
//   const { weddingCode } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [relation, setRelation] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [side, setSide] = useState("");
//   const [parents, setParents] = useState([]);
//   const [people, setPeople] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [facingMode, setFacingMode] = useState("user"); // "user" for front, "environment" for back
  
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   /* ===============================
//       FETCH PEOPLE
//   =============================== */
//   useEffect(() => {
//     if (!weddingCode) return;

//     const fetchPeople = async () => {
//       try {
//         const res = await axios.get(
//           `${BACKEND_URL}/api/people?weddingCode=${weddingCode}`
//         );
//         setPeople(res.data);
//       } catch (err) {
//         console.error("Failed to fetch people:", err);
//       }
//     };

//     fetchPeople();
//   }, [weddingCode]);

//   /* ===============================
//       CLEANUP CAMERA ON UNMOUNT
//   =============================== */
//   useEffect(() => {
//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   /* ===============================
//       START CAMERA
//   =============================== */
//   const startCamera = async () => {
//     setShowCamera(true);
//     setCameraActive(true);
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: { exact: facingMode } } 
//       });
//       streamRef.current = stream;
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
      
//       // If exact facing mode fails, try without exact constraint
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ 
//           video: true 
//         });
//         streamRef.current = stream;
        
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (fallbackErr) {
//         console.error("Fallback camera access failed:", fallbackErr);
//         alert("Unable to access camera. Please check permissions.");
//         setShowCamera(false);
//         setCameraActive(false);
//       }
//     }
//   };

//   /* ===============================
//       SWITCH CAMERA (FRONT/BACK)
//   =============================== */
//   const switchCamera = () => {
//     const newMode = facingMode === "user" ? "environment" : "user";
//     setFacingMode(newMode);
    
//     // Restart camera with new mode
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
    
//     // Small delay to ensure cleanup
//     setTimeout(() => {
//       startCamera();
//     }, 100);
//   };

//   /* ===============================
//       CAPTURE PHOTO FROM CAMERA
//   =============================== */
//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       // Draw video frame to canvas
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Convert canvas to blob
//       canvas.toBlob((blob) => {
//         // Create file from blob
//         const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
//         setPhoto(file);
        
//         // Create preview URL
//         const previewUrl = URL.createObjectURL(blob);
//         setPhotoPreview(previewUrl);
        
//         // Stop camera
//         if (streamRef.current) {
//           streamRef.current.getTracks().forEach(track => track.stop());
//           streamRef.current = null;
//         }
//         setShowCamera(false);
//         setCameraActive(false);
//       }, 'image/jpeg', 0.9);
//     }
//   };

//   /* ===============================
//       STOP CAMERA
//   =============================== */
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     setShowCamera(false);
//     setCameraActive(false);
//   };

//   /* ===============================
//       HANDLE FILE UPLOAD
//   =============================== */
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file);
//       const previewUrl = URL.createObjectURL(file);
//       setPhotoPreview(previewUrl);
//     }
//   };

//   /* ===============================
//       REMOVE PHOTO
//   =============================== */
//   const removePhoto = () => {
//     setPhoto(null);
//     setPhotoPreview(null);
//     if (document.getElementById("photo-input")) {
//       document.getElementById("photo-input").value = "";
//     }
//   };

//   /* ===============================
//       HANDLE SUBMIT
//   =============================== */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     /* -------- REQUIRED VALIDATION -------- */
//     if (!name || !relation || !side || !weddingCode) {
//       alert("Please fill all required fields.");
//       setLoading(false);
//       return;
//     }

//     /* -------- PREVENT MULTIPLE GROOM -------- */
//     if (relation === "Groom") {
//       const groomExists = people.find(
//         (p) => p.relation?.toLowerCase() === "groom"
//       );

//       if (groomExists) {
//         alert("Only one Groom is allowed.");
//         setLoading(false);
//         return;
//       }

//       if (parents.length > 0) {
//         alert("Groom cannot have parents selected.");
//         setLoading(false);
//         return;
//       }
//     }

//     /* -------- PREVENT MULTIPLE BRIDE -------- */
//     if (relation === "Bride") {
//       const brideExists = people.find(
//         (p) => p.relation?.toLowerCase() === "bride"
//       );

//       if (brideExists) {
//         alert("Only one Bride is allowed.");
//         setLoading(false);
//         return;
//       }

//       if (parents.length > 0) {
//         alert("Bride cannot have parents selected.");
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("relation", relation);
//       formData.append("side", side);
//       formData.append("weddingCode", weddingCode);
//       formData.append("parents", JSON.stringify(parents));

//       if (photo) {
//         formData.append("photo", photo);
//       }

//       await axios.post(`${BACKEND_URL}/api/people`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ Family member added successfully!");

//       // Refresh people
//       const updated = await axios.get(
//         `${BACKEND_URL}/api/people?weddingCode=${weddingCode}`
//       );
//       setPeople(updated.data);

//       // Reset form
//       setName("");
//       setRelation("");
//       setSide("");
//       setParents([]);
//       setPhoto(null);
//       setPhotoPreview(null);
//       if (document.getElementById("photo-input")) {
//         document.getElementById("photo-input").value = "";
//       }

//       setFormSubmitted(true);

//       // Navigate safely
//       navigate(`/tree/${weddingCode}`);
//     } catch (err) {
//       console.error("Error adding member:", err);
//       alert(err.response?.data?.error || "Failed to add member");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===============================
//       INVALID LINK
//   =============================== */
//   if (!weddingCode) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-xl shadow-md text-center">
//           <h2 className="text-xl font-bold mb-3">Invalid Wedding Link</h2>
//           <p className="text-gray-600 mb-4">
//             Please use a valid wedding QR link.
//           </p>
//           <Link to="/" className="text-rose-500 hover:underline">
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   /* ===============================
//       UI
//   =============================== */
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 p-6">
//       {!formSubmitted ? (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl space-y-6"
//         >
//           <h2 className="text-2xl font-bold text-center">
//             👨‍👩‍👧 Add Family Member
//           </h2>

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Side */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Family Side *
//             </label>
//             <select
//               value={side}
//               onChange={(e) => setSide(e.target.value)}
//               className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
//               required
//             >
//               <option value="">Select Side</option>
//               <option value="groom">Groom's Side</option>
//               <option value="bride">Bride's Side</option>
//             </select>
//           </div>

//           {/* Relation */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Relationship *
//             </label>
//             <select
//               value={relation}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setRelation(value);
//                 if (value === "Groom") setSide("groom");
//                 if (value === "Bride") setSide("bride");
//               }}
//               className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
//               required
//             >
//               <option value="">Select Relationship</option>
//               <option value="Groom">Groom</option>
//               <option value="Bride">Bride</option>
//               <option value="Father">Father</option>
//               <option value="Mother">Mother</option>
//               <option value="Son">Son</option>
//               <option value="Daughter">Daughter</option>
//               <option value="Brother">Brother</option>
//               <option value="Sister">Sister</option>
//               <option value="Grandfather">Grandfather</option>
//               <option value="Grandmother">Grandmother</option>
//               <option value="Uncle">Uncle</option>
//               <option value="Aunt">Aunt</option>
//               <option value="Cousin">Cousin</option>
//               <option value="In-Law">In-Law</option>
//               <option value="Friend">Friend</option>
//             </select>
//           </div>

//           {/* Parents */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Parents (Optional - hold Ctrl/Cmd to select multiple)
//             </label>
//             <select
//               multiple
//               value={parents}
//               onChange={(e) =>
//                 setParents(
//                   Array.from(e.target.selectedOptions, (o) => o.value)
//                 )
//               }
//               className="w-full border rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-rose-500"
//             >
//               {people
//                 .filter((p) => p.side === side)
//                 .map((p) => (
//                   <option key={p._id} value={p._id}>
//                     {p.name} ({p.relation})
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Photo Section with both options */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Photo (Optional)
//             </label>
            
//             {/* Photo Preview */}
//             {photoPreview && (
//               <div className="mb-3 relative inline-block">
//                 <img 
//                   src={photoPreview} 
//                   alt="Preview" 
//                   className="w-32 h-32 object-cover rounded-lg border-2 border-rose-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={removePhoto}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-all"
//                 >
//                   ✕
//                 </button>
//               </div>
//             )}

//             {/* Camera Button */}
//             {!showCamera && !photoPreview && (
//               <button
//                 type="button"
//                 onClick={startCamera}
//                 className="w-full mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all font-medium"
//               >
//                 📸 Take Photo with Camera
//               </button>
//             )}

//             {/* Camera View */}
//             {showCamera && (
//               <div className="mb-3">
//                 <div className="relative">
//                   <video
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     className="w-full rounded-lg border-2 border-rose-200 bg-black"
//                   />
//                   <canvas ref={canvasRef} className="hidden" />
                  
//                   {/* Camera Mode Indicator */}
//                   <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
//                     {facingMode === "user" ? "📱 Front" : "📷 Back"}
//                   </div>
//                 </div>
                
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     type="button"
//                     onClick={switchCamera}
//                     className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-all font-medium"
//                   >
//                     🔄 Switch Camera
//                   </button>
//                   <button
//                     type="button"
//                     onClick={capturePhoto}
//                     className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all font-medium"
//                   >
//                     📷 Capture
//                   </button>
//                   <button
//                     type="button"
//                     onClick={stopCamera}
//                     className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all font-medium"
//                   >
//                     ❌ Cancel
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* File Upload Option */}
//             {!showCamera && (
//               <div>
//                 <input
//                   id="photo-input"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileUpload}
//                   className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1 text-center">
//                   Or choose from gallery
//                 </p>
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Adding...
//               </span>
//             ) : (
//               "➕ Add to Family Tree"
//             )}
//           </button>
//         </form>
//       ) : (
//         <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md">
//           <div className="text-6xl mb-4">🎉</div>
//           <h3 className="text-xl font-bold mb-3">Member Added Successfully!</h3>
//           <p className="text-gray-600 mb-4">
//             Redirecting you to the family tree...
//           </p>
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
//         </div>
//       )}
//     </div>
//   );
// }