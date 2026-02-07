import React, { useState } from "react";
import { Logout } from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import {
  Gamepad2,
  ShieldAlert,
  LogOut,
  Settings,
  Download,
  Eye,
  EyeOff,
  Award,
  TrendingUp,
  ShoppingBag,
  Calendar,
  DollarSign,
  Package,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  // Sample User Data
  const user = {
    name: "Alex Gaming Pro",
    email: "alex@gamingpro.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2023",
    tier: "PLATINUM",
    totalOrders: 24,
    totalSpent: 12458.76,
    avatar: "👾",
  };

  const handleLogout = async () => {
    Logout();
    navigate("/login");
  };

  // Sample Orders Data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      items: [
        { name: "RTX 4090 Graphics Card", qty: 1, price: 1599.99 },
        { name: "Corsair K95 Platinum", qty: 1, price: 199.99 },
      ],
      total: 1799.98,
      trackingId: "TRK-2024-15847",
    },
    {
      id: "ORD-002",
      date: "2024-01-08",
      status: "delivered",
      items: [{ name: "SteelSeries Arctis Pro", qty: 1, price: 329.99 }],
      total: 329.99,
      trackingId: "TRK-2024-15236",
    },
    {
      id: "ORD-003",
      date: "2024-01-02",
      status: "processing",
      items: [
        { name: "Intel Core i9-13900K", qty: 1, price: 589.99 },
        { name: "MSI MEG Z790 Motherboard", qty: 1, price: 599.99 },
      ],
      total: 1189.98,
      trackingId: "TRK-2024-14958",
    },
    {
      id: "ORD-004",
      date: "2023-12-28",
      status: "delivered",
      items: [
        { name: "Logitech G502 Mouse", qty: 2, price: 79.99 },
        { name: "Sony WH-1000XM5", qty: 1, price: 399.99 },
      ],
      total: 559.97,
      trackingId: "TRK-2023-14752",
    },
    {
      id: "ORD-005",
      date: "2023-12-20",
      status: "delivered",
      items: [{ name: "Samsung 4K Monitor 144Hz", qty: 1, price: 799.99 }],
      total: 799.99,
      trackingId: "TRK-2023-14521",
    },
    {
      id: "ORD-006",
      date: "2023-12-15",
      status: "cancelled",
      items: [{ name: "ASUS ROG Zephyrus G14", qty: 1, price: 1299.99 }],
      total: 0,
      trackingId: "TRK-2023-14312",
    },
    {
      id: "ORD-007",
      date: "2023-12-10",
      status: "delivered",
      items: [{ name: "HyperX Cloud Stinger 2", qty: 3, price: 89.99 }],
      total: 269.97,
      trackingId: "TRK-2023-14105",
    },
    {
      id: "ORD-008",
      date: "2023-12-05",
      status: "delivered",
      items: [
        { name: "Razer DeathAdder V3", qty: 1, price: 69.99 },
        { name: "NVIDIA RTX 4080", qty: 1, price: 1199.99 },
      ],
      total: 1269.98,
      trackingId: "TRK-2023-13895",
    },
  ];

  // Filter orders
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-400 bg-green-400 bg-opacity-10";
      case "processing":
        return "text-yellow-400 bg-yellow-400 bg-opacity-10";
      case "cancelled":
        return "text-red-400 bg-red-400 bg-opacity-10";
      default:
        return "text-white bg-white bg-opacity-10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return "✓";
      case "processing":
        return "⧗";
      case "cancelled":
        return "✕";
      default:
        return "•";
    }
  };

  const stats = [
    {
      label: "Total Orders",
      value: user.totalOrders,
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Spent",
      value: `$${user.totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Member Since",
      value: user.joinDate,
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Status",
      value: user.tier,
      icon: Award,
      color: "from-yellow-500 to-yellow-600",
    },
  ];

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
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black bg-opacity-40 backdrop-blur-xl border-b border-white border-opacity-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8 text-white" />
                <h1
                  className="text-3xl font-black text-white tracking-wider"
                  style={{
                    textShadow: "0 0 20px rgba(255,255,255,0.3)",
                  }}
                >
                  PLAYER DASHBOARD
                </h1>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-black font-bold flex items-center gap-2"
                >
                  Store
                </Link>
                <a
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-black font-bold flex items-center gap-2"
                >
                  LOGOUT
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - User Card */}
            <div className="lg:col-span-1">
              {/* User Profile Card */}
              <div className="relative group mb-8">
                {/* Glow Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-20 rounded-lg blur transition duration-500"></div>

                {/* Card */}
                <div className="relative bg-black bg-opacity-40 backdrop-blur-xl border border-white border-opacity-10 rounded-lg p-6 text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center text-5xl shadow-lg">
                    {user.avatar}
                  </div>

                  {/* User Info */}
                  <h2 className="text-white font-black text-xl mb-1 tracking-wide">
                    {user.name}
                  </h2>
                  <div className="inline-block px-3 py-1 bg-yellow-500 text-black font-bold text-xs rounded-full mb-4 tracking-widest">
                    {user.tier}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-left mb-6">
                    <div>
                      <p className="text-black bg-white text-opacity-60 text-xs tracking-widest mb-1">
                        EMAIL
                      </p>
                      <p className="text-white font-mono text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-black bg-white text-opacity-60 text-xs tracking-widest mb-1">
                        PHONE
                      </p>
                      <p className="text-white font-mono text-sm">
                        {user.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-black bg-white text-opacity-60 text-xs tracking-widest mb-1">
                        MEMBER SINCE
                      </p>
                      <p className="text-white font-mono text-sm">
                        {user.joinDate}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 my-6"></div>

                  {/* Stats Mini */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white bg-opacity-5 rounded-lg p-3">
                      <p className="text-black font-black text-lg">
                        {user.totalOrders}
                      </p>
                      <p className="text-black text-opacity-60 text-xs tracking-widest">
                        ORDERS
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-5 rounded-lg p-3">
                      <p className="text-green-400 font-black text-lg">
                        ${user.totalSpent.toFixed(0)}
                      </p>
                      <p className="text-black text-opacity-60 text-xs tracking-widest">
                        SPENT
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className="w-full py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm tracking-widest">
                      EDIT PROFILE
                    </button>
                    <button className="w-full py-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-black font-bold rounded-lg hover:bg-opacity-20 transition-all duration-300 text-sm tracking-widest flex items-center justify-center gap-2">
                      <Settings size={16} />
                      SETTINGS
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6">
                <h3 className="text-black font-black mb-4 tracking-widest">
                  QUICK STATS
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-black text-opacity-60 text-xs mb-2 tracking-widest">
                      AVG ORDER VALUE
                    </p>
                    <p className="text-black font-black text-xl">
                      ${(user.totalSpent / user.totalOrders).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-black text-opacity-60 text-xs mb-2 tracking-widest">
                      LOYALTY POINTS
                    </p>
                    <p className="text-black font-black text-xl text-yellow-400">
                      00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Orders */}
            <div className="lg:col-span-3">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="group relative">
                      {/* Glow Background */}
                      <div
                        className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-lg blur transition duration-500"
                        style={{
                          backgroundImage: `linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))`,
                        }}
                      ></div>

                      {/* Card */}
                      <div className="relative bg-black bg-opacity-40 backdrop-blur-xl border border-white border-opacity-10 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-white text-opacity-60 text-xs tracking-widest mb-2">
                              {stat.label}
                            </p>
                            <p className="text-white font-black text-2xl">
                              {stat.value}
                            </p>
                          </div>
                          <Icon className="w-8 h-8 text-white text-opacity-30" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Orders Section */}
              <div>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h2 className="text-2xl font-black text-white tracking-wider">
                    ORDER HISTORY
                  </h2>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {["all", "delivered", "processing", "cancelled"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm tracking-widest transition-all duration-300 ${
                            filterStatus === status
                              ? "bg-white text-black"
                              : "bg-black bg-opacity-10 text-white hover:bg-opacity-20"
                          }`}
                        >
                          {status.toUpperCase()}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="group relative"
                      style={{
                        animation: `slideIn 0.5s ease-out`,
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Glow Border */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-15 rounded-lg blur transition duration-500"></div>

                      {/* Order Card */}
                      <div className="relative bg-black bg-opacity-40 backdrop-blur-xl border border-white border-opacity-10 rounded-lg p-6 transition-all duration-300">
                        {/* Order Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-black text-lg tracking-wider">
                                {order.id}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs text-white font-bold tracking-widest ${getStatusColor(order.status)}`}
                              >
                                {getStatusIcon(order.status)}{" "}
                                {order.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-white text-opacity-60 text-sm">
                              📅{" "}
                              {new Date(order.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-opacity-60 text-xs tracking-widest mb-1">
                              ORDER TOTAL
                            </p>
                            <p
                              className={`font-black text-2xl ${order.status === "cancelled" ? "text-red-400" : "text-green-400"}`}
                            >
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Items Preview */}
                        <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-4">
                          <h4 className="text-black font-bold text-sm tracking-widest mb-3">
                            ITEMS ({order.items.length})
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-sm"
                              >
                                <div>
                                  <p className="text-black">{item.name}</p>
                                  <p className="text-black text-opacity-60 text-xs">
                                    Qty: {item.qty}
                                  </p>
                                </div>
                                <p className="text-black font-bold">
                                  ${(item.price * item.qty).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tracking & Actions */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div>
                            <p className="text-white text-opacity-60 text-xs tracking-widest mb-1">
                              TRACKING ID
                            </p>
                            <p className="text-white font-mono text-sm">
                              {order.trackingId}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setShowOrderDetails(
                                  showOrderDetails === order.id
                                    ? null
                                    : order.id,
                                )
                              }
                              className="px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 text-black font-bold rounded-lg hover:bg-opacity-20 transition-all duration-300 text-sm tracking-widest flex items-center gap-2"
                            >
                              <Eye size={16} />
                              {showOrderDetails === order.id
                                ? "HIDE"
                                : "DETAILS"}
                            </button>
                            <button className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm tracking-widest flex items-center gap-2">
                              <Download size={16} />
                              INVOICE
                            </button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {showOrderDetails === order.id && (
                          <div className="bg-amber-300 mt-4 pt-4 border-t border-white border-opacity-10 animate-slideDown">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-black text-opacity-60 text-xs tracking-widest mb-2">
                                  SHIPPING ADDRESS
                                </p>
                                <p className="text-black">123 Gaming Street</p>
                                <p className="text-black text-opacity-70">
                                  Tech City, CA 94105
                                </p>
                              </div>
                              <div>
                                <p className="text-black text-opacity-60 text-xs tracking-widest mb-2">
                                  ESTIMATED DELIVERY
                                </p>
                                <p className="text-black">
                                  {order.status === "delivered"
                                    ? "Delivered on " +
                                      new Date(order.date).toLocaleDateString()
                                    : new Date(
                                        new Date(order.date).getTime() +
                                          5 * 24 * 60 * 60 * 1000,
                                      ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-black text-opacity-60 text-xs tracking-widest mb-2">
                                  PAYMENT METHOD
                                </p>
                                <p className="text-black">Credit Card</p>
                                <p className="text-black text-opacity-70">
                                  •••• •••• •••• 4242
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                      <Package
                        size={48}
                        className="mx-auto text-white text-opacity-30 mb-4"
                      />
                      <p className="text-white text-opacity-60 text-lg">
                        No{" "}
                        {filterStatus === "all"
                          ? "orders"
                          : filterStatus + " orders"}{" "}
                        found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        * {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
