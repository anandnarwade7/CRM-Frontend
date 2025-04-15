import React from "react";
import { useToast } from "./hooks/use-toast";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { toast } = useToast();
  const role = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("userId");

  if (!userId || !role) {
    sessionStorage.clear();

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
