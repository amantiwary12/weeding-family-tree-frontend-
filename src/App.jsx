// // 📄 src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ScanForm from "./pages/ScanForm";
// import TreeView from "./pages/TreeView";
// import CreateWedding from "./pages/CreateWedding";
// // import Navbar from './components/Navbar';

// const App = () => {
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//          <Route path="/scan" element={<ScanForm />} />
//         <Route path="/tree" element={<TreeView />} /> 
        
//       </Routes>
//     </div>
//   );
// };

// export default App;



// 📄 src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScanForm from "./pages/ScanForm";
import TreeView from "./pages/TreeView";
import CreateWedding from "./pages/CreateWedding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* ✅ OLD ROUTES (keep for backward compatibility) */}
        <Route path="/scan" element={<ScanForm />} />
        <Route path="/tree" element={<TreeView />} />
        <Route path="/tree" element={<TreeView />} />
        
        {/* ✅ NEW ROUTES WITH WEDDING CODE PARAMETERS */}
        <Route path="/create-wedding" element={<CreateWedding />} />
        <Route path="/scan/:weddingCode" element={<ScanForm />} />
        <Route path="/tree/:weddingCode" element={<TreeView />} />
      </Routes>
    </div>
  );
};

export default App;