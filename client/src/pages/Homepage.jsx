import React from "react";
import { useState, useEffect } from "react";
import {
  Gamepad2,
  ShieldAlert,
  Grid3x3,
  Package,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import {isLoggedIn } from "../services/userStatus.service.js";

export default function HomePage() {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const flagIs = await isLoggedIn();
        setFlag(flagIs);
        if(!flag) {
          throw new Error("Not a log in user Please log in first.");
        }
      } catch (err) {
        throw err;
      }
    };
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Vintage Gaming Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Scanline Effect */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
          animation: "flicker 0.15s infinite",
        }}
      ></div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Animated Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-white opacity-3 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Top Header Section */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-3 mb-8 animate-bounce">
            <Gamepad2 className="w-12 h-12 text-white" />
            <h1
              className="text-6xl font-black text-white tracking-wider"
              style={{
                fontFamily: "Arial Black, sans-serif",
                textShadow:
                  "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
              }}
            >
              ARCADE
            </h1>
          </div>
          <p className="text-white text-opacity-70 text-lg tracking-widest font-light mb-4">
            YOUR STORE
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-16 max-w-2xl">
          <h2
            className="text-3xl font-black text-white tracking-wider mb-4"
            style={{
              textShadow: "0 0 10px rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            WELCOME PLAYER
          </h2>
          <p className="text-white text-opacity-60 text-sm tracking-widest font-light">
            SELECT YOUR NEXT PRODUCTS NOW
          </p>
        </div>

        {/* Button Container */}
        {false && (
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full max-w-2xl mb-16">
            {/* Dashboard Button */}
            <div className="relative group w-full sm:w-auto">
              {/* Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition duration-500"></div>

              {/* Button */}
              <Link
                to="/dashboard"
                className="relative w-full sm:w-auto px-8 py-6 bg-gradient-to-br from-white to-gray-200 dashboard_text font-black text-xl tracking-wider rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-4 group overflow-hidden"
              >
                DASHBOARD
              </Link>
            </div>

            {/* View Products Button */}
            <div className="relative group w-full sm:w-auto">
              {/* Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition duration-500"></div>

              {/* Button */}
              <Link
                to="/products"
                className="relative w-full sm:w-auto px-8 py-6 bg-gradient-to-br from-white to-gray-200 dashboard_text font-black text-xl tracking-wider rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-4 group overflow-hidden"
              >
                VIEW PRODUCTS
              </Link>
            </div>
          </div>
        )}

        {true && (
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full max-w-2xl mb-16">
            {/* Dashboard Button */}
            <div className="relative group w-full sm:w-auto">
              {/* Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition duration-500"></div>

              {/* Button */}
              <Link
                to="/login"
                className="relative w-full sm:w-auto px-8 py-6 bg-gradient-to-br from-white to-gray-200 dashboard_text font-black text-xl tracking-wider rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-4 group overflow-hidden"
              >
                PLEASE LOGIN FISRT
              </Link>
            </div>
          </div>
        )}

        {/* Decorative Line */}
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mb-16"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes flicker {
          0% { opacity: 0.5; }
          50% { opacity: 0.3; }
          100% { opacity: 0.5; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        * {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
        }

        button {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
        }

        /* Responsive button sizing */
        @media (max-width: 640px) {
          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
