// src/App.jsx
import React from "react";
import { useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import ProductsPage from "./pages/ProductPage";
import DashboardPage from "./pages/Dashboard";
import NotFoundPage from "./pages/404";
import AddProduct from "./pages/Addproduct";
import AdminDashboard from "./pages/Admindashboard";


const App = () => {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   // Fetch user session
  //   fetchUserSession();
  // }, []);

  // const fetchUserSession = async () => {
  //   try {
  //     // Replace with your actual API endpoint
  //     const response = await fetch("/api/auth/session", {
  //       credentials: "include", // Include cookies
  //     });
  //     const data = await response.json();

  //     setUser(data.user);

  //     // If user is admin, fetch admin-specific data
  //     if (data.user.role === "admin") {
  //       fetchAdminData(data.user.id);
  //     }
  //   } catch (error) {
  //     console.error("Session fetch failed:", error);
  //   }
  // };

  // const fetchAdminData = async (userId) => {
  //   try {
  //     // Fetch admin profile
  //     const adminRes = await fetch(`/api/admins/by-user/${userId}`);
  //     const admin = await adminRes.json();
  //     setAdminData(admin);

  //     // Fetch analytics
  //     const analyticsRes = await fetch(`/api/admins/${admin.id}/analytics`);
  //     const analyticsData = await analyticsRes.json();
  //     setAnalytics(analyticsData);

  //     // Fetch categories for product form
  //     const categoriesRes = await fetch("/api/categories");
  //     const categoriesData = await categoriesRes.json();
  //     setCategories(categoriesData);
  //   } catch (error) {
  //     console.error("Admin data fetch failed:", error);
  //   }
  // };

  const handleProductSubmit = async (productData) => {
    // Handle file uploads first if using files
    const formData = new FormData();

    // Add product fields
    Object.keys(productData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, productData[key]);
      }
    });

    // Handle images
    for (let i = 0; i < productData.images.length; i++) {
      const img = productData.images[i];
      if (img.type === "file" && img.file) {
        formData.append(`image${i + 1}`, img.file);
      } else if (img.type === "url") {
        formData.append(`image${i + 1}_url`, img.url);
      }
    }

    const response = await fetch("/api/products", {
      method: "POST",
      body: formData, // Don't set Content-Type, browser will set it with boundary
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    return await response.json();
  };

  const ProtectedAdminRoute = ({ children }) => {
    // if (!user) return <div>Loading...</div>;
    // if (user.role !== "admin") return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/products" element={
            <ProtectedAdminRoute>
              <ProductsPage/>
            </ProtectedAdminRoute>
          } />
        <Route path="/dashboard" element={
            <ProtectedAdminRoute>
              <DashboardPage />
            </ProtectedAdminRoute>
          } />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard admin={adminData} analytics={analytics} />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <ProtectedAdminRoute>
              <AddProduct
                adminId={adminData?.id}
                categories={categories}
                onSubmit={handleProductSubmit}
              />
            </ProtectedAdminRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
