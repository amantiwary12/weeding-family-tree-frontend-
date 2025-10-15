// import React, { useState } from "react";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:8000"; // Updated to your backend

// export default function ScanForm() {
//   const [name, setName] = useState("");
//   const [relation, setRelation] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [side, setSide] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!name || !relation || !side) {
//       alert("Please fill all required fields");
//       setLoading(false);
//       return;
//     }

//     const relationMap = {
//       "Self (Groom/Bride)": { code: "self", label: "Self" },
//       Groom: { code: "groom", label: "Groom" },
//       Bride: { code: "bride", label: "Bride" },
//       Father: { code: "father", label: "Father" },
//       Mother: { code: "mother", label: "Mother" },
//       Brother: { code: "brother", label: "Brother" },
//       Sister: { code: "sister", label: "Sister" },
//       Son: { code: "son", label: "Son" },
//       Daughter: { code: "daughter", label: "Daughter" },
//       Uncle: { code: "uncle", label: "Uncle" },
//       Aunt: { code: "aunt", label: "Aunt" },
//       Cousin: { code: "cousin", label: "Cousin" },
//     };

//     const { label } = relationMap[relation] || { label: "Other" };

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("relation", label);
//       formData.append("side", side);
//       if (photo) formData.append("photo", photo);

//       const response = await axios.post(`${BACKEND_URL}/api/people`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("✅ Added:", response.data);
//       alert("✅ Family member added successfully!");

//       setName("");
//       setRelation("");
//       setSide("");
//       setPhoto(null);
//       document.getElementById("photo-input").value = "";
//     } catch (err) {
//       console.error("❌ Error adding member:", err);
//       const errorMessage = err.response?.data?.error || err.message || "Failed to add family member";
//       alert(`Error: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-rose-100"
//       >
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">👨‍👩‍👧 Add Family Member</h2>
//           <p className="text-gray-600">Join our family tree</p>
//         </div>

//         {/* Name */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter full name"
//             className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
//             required
//           />
//         </div>

//         {/* Side */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">Family Side *</label>
//           <select
//             value={side}
//             onChange={(e) => setSide(e.target.value)}
//             className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
//             required
//           >
//             <option value="">Select family side</option>
//             <option value="groom">Groom's Side</option>
//             <option value="bride">Bride's Side</option>
//           </select>
//         </div>

//         {/* Relation */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">Relationship *</label>
//           <select
//             value={relation}
//             onChange={(e) => setRelation(e.target.value)}
//             className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
//             required
//           >
//             <option value="">Select relationship</option>
//             <option value="Self (Groom/Bride)">Self (Groom/Bride)</option>
//             <option value="Groom">Groom</option>
//             <option value="Bride">Bride</option>
//             <option value="Father">Father</option>
//             <option value="Mother">Mother</option>
//             <option value="Brother">Brother</option>
//             <option value="Sister">Sister</option>
//             <option value="Son">Son</option>
//             <option value="Daughter">Daughter</option>
//             <option value="Uncle">Uncle</option>
//             <option value="Aunt">Aunt</option>
//             <option value="Cousin">Cousin</option>
//           </select>
//         </div>

//         {/* Photo */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">Image</label>
//           <input
//             id="photo-input"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setPhoto(e.target.files[0])}
//             className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
//           />
//           {photo && <p className="text-sm text-green-600 mt-2">✅ Selected: {photo.name}</p>}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//           }`}
//         >
//           {loading ? "Adding..." : "➕ Add Family Member"}
//         </button>
//       </form>
//     </div>
//   );
// }




import React, { useState } from "react";
import axios from "axios";
import pay from "../../assets/payment10.jpg"; // GPay QR code image

const BACKEND_URL = "http://localhost:8000";

export default function ScanForm() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [side, setSide] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // ✅ new state for showing payment after submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !relation || !side) {
      alert("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("relation", relation);
      formData.append("side", side);
      if (photo) formData.append("photo", photo);

      const res = await axios.post(`${BACKEND_URL}/api/people`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Added:", res.data);
      alert("✅ Family member added successfully!");

      setName("");
      setRelation("");
      setSide("");
      setPhoto(null);
      document.getElementById("photo-input").value = "";

      // ✅ show payment section
      setFormSubmitted(true);
    } catch (err) {
      console.error("❌ Error adding member:", err);
      const message =
        err.response?.data?.error || err.message || "Failed to add member";
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GPay details
  const upiLink =
    "upi://pay?pa=amantiwary2505@okhdfcbank&pn=Aman%20Tiwary&cu=INR";
  const handlePayClick = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex flex-col items-center justify-center p-6 space-y-8">
      {/* ================== FORM ================== */}
      {!formSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-rose-100"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
              👨‍👩‍👧 Add Family Member
            </h2>
            <p className="text-gray-600">Join our family tree</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          {/* Side */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Family Side *
            </label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
              required
            >
              <option value="">Select family side</option>
              <option value="groom">Groom's Side</option>
              <option value="bride">Bride's Side</option>
            </select>
          </div>

          {/* Relation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Relationship *
            </label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500"
              required
            >
              <option value="">Select relationship</option>
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

          {/* Photo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image
            </label>
            <input
              id="photo-input"
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
            />
            {photo && (
              <p className="text-sm text-green-600 mt-2">
                ✅ Selected: {photo.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-lg"
            }`}
          >
            {loading ? "Adding..." : "➕ Add Family Member"}
          </button>
        </form>
      )}

      {/* ================== PAYMENT SECTION ================== */}
      {formSubmitted && (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-center border border-rose-100">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            🎉 Member Added Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for joining the family tree. If you'd like, you can
            support the creator below 💙
          </p>

          {/* QR */}
          <img
            src={pay}
            alt="Pay via Google Pay"
            className="w-56 h-56 mx-auto rounded-xl shadow-md cursor-pointer transition hover:scale-105"
            onClick={handlePayClick}
          />

          <p className="mt-3 text-gray-600 text-sm">
            Scan or tap the QR to pay securely using UPI
          </p>

          {/* Pay Button */}
          <button
            onClick={handlePayClick}
            className="mt-5 bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Pay with GPay / UPI
          </button>

          <button
            onClick={() => setFormSubmitted(false)}
            className="mt-4 text-rose-600 font-medium hover:underline"
          >
            ⬅️ Add Another Member
          </button>
        </div>
      )}
    </div>
  );
}
