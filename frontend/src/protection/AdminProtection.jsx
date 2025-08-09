import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtection = ({ children }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("jobboard_user");

  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Error parsing user data:", err);
    return <Navigate to="/" replace />;
  }
};

export default AdminProtection;
