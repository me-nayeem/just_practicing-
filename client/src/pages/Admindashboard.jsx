import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AdminDashboard Component
 * Displays admin analytics, tier badge, and verification status
 * 
 * Props:
 * @param {Object} admin - Admin data from database
 * @param {number} admin.id
 * @param {string} admin.store_name
 * @param {boolean} admin.is_verified
 * @param {number} admin.total_sales
 * @param {Object} analytics - Dashboard metrics
 * @param {number} analytics.totalProducts
 * @param {number} analytics.totalOrders
 * @param {number} analytics.revenue
 * @param {number} analytics.pendingOrders
 * @param {boolean} analytics.hasLowStock
 */
const AdminDashboard = ({ admin, analytics }) => {
  const navigate = useNavigate();

  // Calculate admin tier based on revenue
  const getAdminTier = (revenue) => {
    if (revenue >= 50000) return { name: 'PLATINUM', color: 'bg-gradient-to-r from-purple-400 to-pink-400' };
    if (revenue >= 20000) return { name: 'GOLD', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' };
    if (revenue >= 5000) return { name: 'SILVER', color: 'bg-gradient-to-r from-gray-300 to-gray-400' };
    return { name: 'BRONZE', color: 'bg-gradient-to-r from-orange-700 to-orange-900' };
  };

  //const tier = getAdminTier(analytics.revenue);
  const tier = getAdminTier(50000);

  // const handleAddProduct = () => {
  //   if (!admin.is_verified) {
  //     alert('Your account is pending verification. Please wait for approval.');
  //     return;
  //   }
  //   navigate('/admin/add-product');
  // };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Exo_2']">
      {/* Google Font Import */}
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎮</span>
            <h1 className="text-3xl font-black tracking-wider">ARCADE STORE</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/store')}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold tracking-wider transition-all"
            >
              STORE
            </button>
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold tracking-wider transition-all">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Verification Banner */}
      {/* !admin.is_verified */}
      { true && (
        <div className="bg-yellow-900/30 border-y border-yellow-600 p-4">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold text-yellow-400">PENDING VERIFICATION</p>
              <p className="text-sm text-gray-300">Your account is under review. Some features are disabled until verification is complete.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar - Admin Profile */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
              {/* Store Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700">
                  <span className="text-6xl">🏪</span>
                </div>
              </div>

              {/* Store Name */}
              <h2 className="text-2xl font-black text-center mb-3 tracking-wider">
                {'Demo Store' || admin.store_name }

              </h2>

              {/* Tier Badge */}
              <div className="flex justify-center mb-6">
                <span className={`${tier.color} px-6 py-1 rounded-full text-black font-black text-sm tracking-wider`}>
                  {tier.name}
                </span>
              </div>

              {/* Admin Info */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-gray-500 text-sm font-bold tracking-wider mb-1">ADMIN ID</p>
                  <p className="text-white font-mono">#{'demo' || admin.id.toString().padStart(6, '0')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold tracking-wider mb-1">STATUS</p>
                  {/* <p className={`font-bold ${admin.is_verified ? 'text-green-400' : 'text-yellow-400'}`}>
                    {admin.is_verified ? '✓ VERIFIED' : '⏳ PENDING'}
                  </p> */}
                  <p className={`font-bold ${true ? 'text-green-400' : 'text-yellow-400'}`}>
                    {true ? '✓ VERIFIED' : '⏳ PENDING'}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black/50 border border-gray-800 rounded-lg p-4 text-center">
                  <p className="text-3xl font-black text-white">{100 || analytics.totalProducts}</p>
                  <p className="text-xs text-gray-400 font-bold tracking-wider">PRODUCTS</p>
                </div>
                <div className="bg-black/50 border border-gray-800 rounded-lg p-4 text-center">
                  <p className="text-3xl font-black text-green-400">${1000 ||analytics.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 font-bold tracking-wider">EARNED</p>
                </div>
              </div>

              {/* Action Buttons */}
              <button 
                // onClick={handleAddProduct}
                // disabled={!admin.is_verified}
                className={`w-full py-3 rounded-lg font-black tracking-wider mb-3 transition-all ${
                  // admin.is_verified 
                  true
                    ? 'bg-green-600 hover:bg-green-500 text-black cursor-pointer' 
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                ➕ ADD PRODUCT
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-black tracking-wider transition-all">
                ⚙️ SETTINGS
              </button>
            </div>
          </div>

          {/* Right Content - Analytics */}
          <div className="lg:col-span-2">
            {/* Top Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400 text-sm font-bold tracking-wider">TOTAL ORDERS</h3>
                  <span className="text-2xl">📦</span>
                </div>
                 
                <p className="text-5xl font-black">{100 || analytics.totalOrders}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400 text-sm font-bold tracking-wider">TOTAL REVENUE</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-5xl font-black text-green-400">${1000 || analytics.revenue.toLocaleString()}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400 text-sm font-bold tracking-wider">PENDING ORDERS</h3>
                  <span className="text-2xl">⏳</span>
                </div>
                <p className="text-5xl font-black text-yellow-400">{10 || analytics.pendingOrders}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400 text-sm font-bold tracking-wider">STOCK ALERTS</h3>
                  {
                  // analytics.hasLowStock
                  false 
                  && (
                    <span className="text-2xl animate-pulse">🔴</span>
                  )}
                  {
                  // !analytics.hasLowStock
                  true
                   && (
                    <span className="text-2xl">✅</span>
                  )}
                </div>
                <p className="text-3xl font-black">
                  {
                  // analytics.hasLowStock 
                  true
                  ? (
                    <span className="text-red-500">LOW STOCK!</span>
                  ) : (
                    <span className="text-green-400">ALL GOOD</span>
                  )}
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-black tracking-wider mb-4 flex items-center gap-2">
                📊 SALES OVERVIEW
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-gray-800">
                  <span className="text-gray-400">Total Products Listed</span>
                  <span className="font-black text-xl">{100 || analytics.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-gray-800">
                  <span className="text-gray-400">Total Sales (Units)</span>
                  <span className="font-black text-xl">{150 || admin.total_sales}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-gray-800">
                  <span className="text-gray-400">Commission Rate</span>
                  <span className="font-black text-xl text-yellow-400">{10 || admin.commission_rate}%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg border border-green-800">
                  <span className="text-green-400 font-bold">Your Earnings (After Commission)</span>
                  <span className="font-black text-2xl text-green-400">
                    ${ 10000 || ((analytics.revenue * (100 - admin.commission_rate)) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;