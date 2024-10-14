import React from "react";
import { useAuth } from "./context/user-auth-context";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default AuthCheck;
