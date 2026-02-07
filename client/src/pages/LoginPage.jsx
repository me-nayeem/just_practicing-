import React, { useState } from "react";
import { Eye, EyeOff, Gamepad2, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../services/auth.service.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { role } = await UserLogin(loginData);

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      throw err;
    }
    alert(`Welcome back, ${loginData.username}! (${loginData.role} mode)`);
  };

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

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gamepad2 className="w-10 h-10 text-white animate-bounce" />
              <h1
                className="text-5xl font-black text-white tracking-wider"
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
            <p className="text-white text-opacity-70 text-sm tracking-widest font-light">
              GAMING STORE PLATFORM
            </p>

            {/* Neon Line */}
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          </div>

          {/* Form Container */}
          <div className="relative group">
            {/* Glow Border */}
            <div className="absolute -inset-px bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-20 rounded-lg blur transition duration-300"></div>

            {/* Form */}
            <div className="relative bg-black bg-opacity-50 backdrop-blur-xl border border-white border-opacity-10 rounded-lg p-8 shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <h2 className="text-2xl font-black text-white mb-8 tracking-wider">
                  PLAYER LOGIN
                </h2>

                {/* Username */}
                <div className="group">
                  <label className="block text-white text-sm font-bold mb-2 tracking-widest">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    placeholder="Enter your username"
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono "
                    required
                  />
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-white text-sm font-bold mb-2 tracking-widest">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 pr-12 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white text-opacity-60 hover:text-opacity-100 transition-all"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="group">
                  <label className="block text-white text-sm font-bold mb-2 tracking-widest">
                    ROLE
                  </label>
                  <select
                    name="role"
                    value={loginData.role}
                    onChange={handleLoginChange}
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono"
                  >
                    <option value="user" className="bg-white">
                      User
                    </option>
                    <option value="admin" className="bg-white">
                      Admin
                    </option>
                  </select>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a
                    href="#"
                    className="text-white text-opacity-60 hover:text-opacity-100 text-xs font-bold tracking-widest transition-all"
                  >
                    FORGOT PASSWORD?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full mt-8 py-3 px-4 bg-white text-black font-black text-lg tracking-wider rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden group"
                >
                  <span className="relative z-10">LOGIN</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* Footer Text */}
                <div className="text-center text-white text-opacity-50 text-xs tracking-widest mt-6">
                  <p>NEW PLAYER?</p>
                  <Link
                    to="/signup"
                    className="text-white font-bold hover:text-opacity-70 transition-all"
                  >
                    CREATE ACCOUNT
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-white text-opacity-30 text-xs tracking-widest">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldAlert size={16} />
              <span>SECURE • ENCRYPTED • VERIFIED</span>
            </div>
            <p>© 2024 ARCADE GAMING STORE. ALL RIGHTS RESERVED.</p>
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

        * {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
        }

        input::placeholder,
        select {
          font-family: 'Courier New', monospace;
        }

        input::-webkit-autofill,
        input::-webkit-autofill:hover,
        input::-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.05) inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  );
}
