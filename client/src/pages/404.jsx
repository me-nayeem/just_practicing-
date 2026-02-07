import React, { useState, useEffect } from "react";
import { Gamepad2, ShieldAlert, Home, RotateCcw, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const [gameActive, setGameActive] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [score, setScore] = useState(0);

  // Trigger random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleGameStart = () => {
    setGameActive(true);
    setScore(Math.floor(Math.random() * 9000) + 1000);
  };


  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-500 opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Main Error Container */}
        <div
          className={`mb-12 transition-all duration-300 ${glitchActive ? "scale-105 opacity-80" : "scale-100 opacity-100"}`}
          style={{
            filter: glitchActive ? "hue-rotate(90deg) brightness(1.2)" : "none",
          }}
        >
          {/* Large 404 Text */}
          <div className="mb-8 relative">
            <h1
              className="text-9xl md:text-[150px] font-black text-white tracking-wider leading-none"
              style={{
                textShadow: `
                  0 0 10px rgba(255,0,0,0.5),
                  0 0 20px rgba(255,255,255,0.3),
                  0 0 40px rgba(255,255,255,0.2)
                `,
                letterSpacing: "0.2em",
                fontFamily: "Arial Black, sans-serif",
              }}
            >
              404
            </h1>

            {/* Glitch Effect Layers */}
            <div
              className="absolute inset-0 text-9xl md:text-[150px] font-black text-red-500 tracking-wider leading-none opacity-0 animate-glitch"
              style={{
                textShadow: "0 0 20px rgba(255,0,0,0.8)",
                letterSpacing: "0.2em",
                fontFamily: "Arial Black, sans-serif",
                animation: glitchActive ? "glitch 0.2s infinite" : "none",
              }}
            >
              404
            </div>
          </div>

          {/* Error Message */}
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-4 tracking-wider"
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            GAME OVER
          </h2>

          <p className="text-white text-opacity-70 text-lg tracking-widest font-light mb-2">
            PAGE NOT FOUND
          </p>

          {/* Error Details Box */}
          <div className="relative group mb-8 inline-block w-full">
            {/* Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-white to-red-500 opacity-0 group-hover:opacity-20 rounded-lg blur transition duration-500"></div>

            {/* Box */}
            <div className="relative bg-black bg-opacity-50 backdrop-blur-xl border border-red-500 border-opacity-30 rounded-lg p-6">
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                  <Zap size={16} />
                  <span>ERROR CODE: 404_NOT_FOUND</span>
                </div>
                <div className="text-white font-mono text-xs text-opacity-60">
                  Status: Resource unavailable
                </div>
                <div className="text-white font-mono text-xs text-opacity-60">
                  Try navigating back or return to home
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {/* Home Button */}
          <div className="relative group">
            {/* Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition duration-500"></div>

            <Link to="/" className="relative px-8 py-4 bg-white text-black font-black text-lg tracking-wider rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group overflow-hidden">
              <Home className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>GO BACK</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes flicker {
          0% { opacity: 0.5; }
          50% { opacity: 0.3; }
          100% { opacity: 0.5; }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          20% {
            transform: translate(-2px, 2px);
            opacity: 0.8;
          }
          40% {
            transform: translate(-2px, -2px);
            opacity: 0.8;
          }
          60% {
            transform: translate(2px, 2px);
            opacity: 0.8;
          }
          80% {
            transform: translate(2px, -2px);
            opacity: 0.8;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        * {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
        }

        .animate-glitch {
          animation: glitch 0.2s infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
