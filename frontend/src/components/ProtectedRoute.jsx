import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role (ensure lowercase and trimmed)
  const userRole = user.role?.toLowerCase()?.trim() || "";
  const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase().trim());

  console.log("ProtectedRoute check:", {
    userRole,
    allowedRoles: normalizedAllowedRoles,
    matches: normalizedAllowedRoles.includes(userRole)
  });

  if (allowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole)) {
    console.warn(`Access denied: User role "${userRole}" not in allowed roles:`, normalizedAllowedRoles);
    return <Navigate to="/dashboard/guest" replace />;
  }

  return children;
};

export default ProtectedRoute;