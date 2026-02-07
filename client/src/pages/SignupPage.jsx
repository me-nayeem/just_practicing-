import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Gamepad2, ShieldAlert, Check, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserSignup } from "../services/auth.service.js";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {
      username = "",
      fullName = "",
      password = "",
      confirmPassword = "",
      email = "",
      phone = "",
      role = "",
    } = signupData || {};

    const uname = String(username).trim();
    const name = String(fullName).trim();
    const mail = String(email).trim();
    const ph = String(phone).replace(/\s+/g, "");
    const r = String(role).trim();

    // username: 3-20 chars, letters/numbers/._-
    if (!uname) {
      alert("Please enter a username");
      return;
    }
    if (!/^[a-zA-Z0-9._-]{3,20}$/.test(uname)) {
      alert(
        "Username must be 3–20 characters and can include letters, numbers, . _ -",
      );
      return;
    }

    if (!name) {
      alert("Please enter your full name");
      return;
    }
    if (!/^[a-zA-Z\u00C0-\u024F'’\-\s.]{2,50}$/.test(name)) {
      alert(
        "Full name looks invalid (use letters, spaces, hyphens or apostrophes)",
      );
      return;
    }

    // email
    if (!mail) {
      alert("Please enter an email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!ph) {
      alert("Please enter a phone number");
      return;
    }
    if (!/^\+?\d{7,15}$/.test(ph)) {
      alert(
        "Please enter a valid phone number (7–15 digits, optional leading +)",
      );
      return;
    }

    if (!r) {
      alert("Please select a role");
      return;
    }
    if (!password) {
      alert("Please enter a password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!pwdRegex.test(password)) {
      alert(
        "Password must be at least 8 characters and include uppercase, lowercase, a number and a special character",
      );
      return;
    }

    const payload = {
      username: uname,
      fullName: name,
      password,
      email: mail,
      phone: ph,
      role: r,
      termsAccepted: signupData.termsAccepted,
    };
    try {
      const response = await UserSignup(signupData);
      setSignupData(payload);
      if (response?.success || response.status === 201) {
        alert(`Account created successfully ${name}! Redirecting...`);
        setTimeout(() => navigate("/login"), 1800);
      } else {
        alert(response?.message || "Something went wrong");
      }
    } catch (err) {
    }
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10 relative">
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
            <div className="relative bg-black bg-opacity-50 backdrop-blur-xl border border-white border-opacity-10 rounded-lg p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
              <form onSubmit={handleSignup} className="space-y-4">
                <h2 className="text-2xl font-black text-white mb-6 tracking-wider">
                  CREATE ACCOUNT
                </h2>

                {/* Username */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    placeholder="Choose username"
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                    required
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    placeholder="Your full name"
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="your@email.com"
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      placeholder="Create password (min 8 characters)"
                      className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 pr-10 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-black text-opacity-60 hover:text-opacity-100 transition-all"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="Confirm password"
                      className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 pr-10 text-black placeholder-dashboard_text_second focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-2.5 text-white text-opacity-60 hover:text-opacity-100 transition-all"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-white text-xs font-bold mb-2 tracking-widest">
                    ACCOUNT TYPE
                  </label>
                  <select
                    name="role"
                    value={signupData.role}
                    onChange={handleSignupChange}
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                  >
                    <option value="user" className="bg-white">
                      User
                    </option>
                    <option value="admin" className="bg-white">
                      Admin
                    </option>
                  </select>
                </div>

                {/* Terms and Conditions */}
                <div className="pt-3 border-t border-white border-opacity-10 mt-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={signupData.termsAccepted}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            termsAccepted: e.target.checked,
                          }))
                        }
                        className="w-5 h-5 opacity-0 cursor-pointer"
                        required
                      />
                      <div
                        className={`absolute inset-0 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                          signupData.termsAccepted
                            ? "bg-white border-white"
                            : "border-white border-opacity-40 group-hover:border-opacity-60"
                        }`}
                      >
                        {signupData.termsAccepted && (
                          <Check size={16} className="text-black" />
                        )}
                      </div>
                    </div>
                    <span className="text-white text-opacity-70 text-xs leading-relaxed font-light flex-1">
                      I agree to the{" "}
                      <span className="font-bold text-white">
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span className="font-bold text-white">
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={!signupData.termsAccepted}
                  className={`w-full mt-6 py-3 px-4 font-black text-lg tracking-wider rounded-lg transition-all duration-300 shadow-lg cursor-pointer relative overflow-hidden group ${
                    signupData.termsAccepted
                      ? "bg-white text-black hover:bg-gray-200 active:scale-95 hover:shadow-xl"
                      : "bg-gray-500 text-black opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10">SIGN UP</span>
                  {signupData.termsAccepted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  )}
                </button>

                {/* Footer Text */}
                <p className="text-center text-white text-opacity-50 text-xs tracking-widest mt-4">
                  ALREADY HAVE ACCOUNT?{" "}
                  <Link
                    to="/login"
                    className="text-white font-bold hover:text-opacity-70 transition-all"
                  >
                    LOGIN
                  </Link>
                </p>
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

        /* Scrollbar styling */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
