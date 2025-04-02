import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/" replace />;
};

export default AdminPrivateRoute;