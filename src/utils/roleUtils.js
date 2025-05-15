// src/utils/roleUtils.js
// src/utils/roleUtils.js (or src/routes/PrivateRoute.jsx)
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return children;
};
