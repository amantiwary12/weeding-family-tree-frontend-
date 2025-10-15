import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScanForm from './pages/ScanForm';
import TreeView from './pages/TreeView';
import Navbar from './components/Navbar'; 

const App = () => {
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scan" element={<ScanForm />} />
      <Route path="/tree" element={<TreeView />} />
    </Routes>
    
    </div>
  );
};
////////////////////////////////
export default App;