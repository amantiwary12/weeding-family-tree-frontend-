import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ScanForm from './pages/ScanForm'
import TreeView from './pages/TreeView'
import './tailwind.css' // Simple import

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/scan" element={<ScanForm />} />
        <Route path="/tree" element={<TreeView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)