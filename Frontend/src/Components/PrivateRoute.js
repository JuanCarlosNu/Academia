import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
