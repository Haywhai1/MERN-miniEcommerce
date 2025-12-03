import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user || !isAdmin) {
    // Not logged in as admin → redirect to admin login
    return <Navigate to="/admin/login" replace />;
  }

  // Admin is logged in → render nested routes
  return <Outlet />;
};

export default AdminRoute;
