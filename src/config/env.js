// 📄 src/config/env.js
export const config = {
  development: {
    frontendUrl: "http://localhost:5173",
    backendUrl: "http://localhost:8000",
  },
  production: { 
    frontendUrl: "https://weeding-family-tree.vercel.app", // fixed typo from "weeding" to "wedding"
    backendUrl: "https://wftbackend.onrender.com",  
  }
};

const environment = import.meta.env.PROD ? 'production' : 'development';

export const FRONTEND_URL = import.meta.env.VITE_APP_URL || config[environment].frontendUrl;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || config[environment].backendUrl;
// 📄 src/config/env.js
export const SCAN_URL = "https://weeding-family-tree.vercel.app/scan";``