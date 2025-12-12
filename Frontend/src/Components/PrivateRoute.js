// src/Components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  // No hay usuario → no está logueado
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Hay usuario pero no tiene permisos
  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
