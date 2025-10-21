import React from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import DownloadPDFButton from "../components/DownloadPDFButton";
import { SCAN_URL } from "../config/env";

// Dynamic scan URL from environment variables or fallback to localhost
// const SCAN_URL =
//   (import.meta.env.VITE_APP_URL || "http://localhost:5173") + "/scan";



const Home = () => {
  
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-rose-400 to-amber-500 rounded-full mb-6 shadow-xl">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-300 rounded-full opacity-80"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-amber-300 rounded-full opacity-80"></div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent font-serif">
              Wedding Family Tree
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden transform hover:shadow-3xl transition-all duration-300">
            <div className="relative bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-8 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white font-serif mb-2">
                  Join Our Family Story
                </h2>
              </div>

              <div className="absolute bottom-2 right-8 text-white opacity-30">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21.9 11.5C21.6 11.2 21.2 11 20.8 11H20.7C20.4 11 20.1 11.1 19.9 11.3C19.7 11.5 19.6 11.7 19.5 12C19.4 12.3 19.3 12.6 19.3 13C19.3 13.8 19.6 14.6 20.1 15.1C20.6 15.6 21.3 16 22 16C22.7 16 23.4 15.6 23.9 15.1C24.4 14.6 24.7 13.8 24.7 13C24.7 12.2 24.4 11.4 23.9 10.9C23.4 10.4 22.7 10 22 10C21.7 10 21.4 10.1 21.1 10.2C21 10.1 20.9 10 20.8 10C20.4 10 20 9.8 19.7 9.5C19.4 9.2 19.2 8.8 19.2 8.4C19.2 8 19.4 7.6 19.7 7.3C20 7 20.4 6.8 20.8 6.8C21.2 6.8 21.6 7 21.9 7.3C22.2 7.6 22.4 8 22.4 8.4C22.4 9.1 22 9.7 21.5 10.1C21.8 10.4 22 10.8 22 11.2C22 11.6 21.8 12 21.5 12.3C21.2 12.6 20.8 12.8 20.4 12.8C20 12.8 19.6 12.6 19.3 12.3C19 12 18.8 11.6 18.8 11.2C18.8 10.8 19 10.4 19.3 10.1C19.6 9.8 20 9.6 20.4 9.6C20.8 9.6 21.2 9.8 21.5 10.1C21.8 10.4 22 10.8 22 11.2C22 11.6 21.8 12 21.5 12.3C21.2 12.6 20.8 12.8 20.4 12.8C20 12.8 19.6 12.6 19.3 12.3C19 12 18.8 11.6 18.8 11.2C18.8 10.8 19 10.4 19.3 10.1C19.6 9.8 20 9.6 20.4 9.6C20.8 9.6 21.2 9.8 21.5 10.1Z" />
                </svg>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* QR Code */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="p-8 bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl shadow-lg border border-rose-200 transform hover:scale-105 transition-transform duration-300">
                      <QRCodeCanvas
                        value={SCAN_URL}
                        size={220}
                        level="H"
                        includeMargin
                        fgColor="#be185d"
                        bgColor="transparent"
                      />
                    </div>
                    <div className="absolute -top-3 -right-3">
                      <span className="bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transform rotate-3">
                        ✨ Scan to Join
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-1 space-y-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/scan"
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <svg
                        className="w-6 h-6 transform group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Join Our Family Tree
                    </Link>

                    <Link
                      to="/tree"
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-white border border-rose-300 text-gray-700 hover:bg-rose-50 hover:border-rose-400 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <svg
                        className="w-6 h-6 transform group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      View Family Tree
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-light mb-2">
              Help us weave the beautiful tapestry of our family story
            </p>
            <p className="text-sm text-gray-500">
              Share this with loved ones to grow our family tree together
            </p>
            <div className="flex justify-center mt-4">
              <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
