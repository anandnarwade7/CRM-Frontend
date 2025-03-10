import React from "react";
import { useToast } from "./hooks/use-toast";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { toast } = useToast();
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");
  const role = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("userId");

  if (tokenExpiry && Date.now() > tokenExpiry) {
    sessionStorage.clear();

    toast({
      variant: "destructive",
      title: "Session Expired",
      description: "Please log in again.",
      duration: 2000,
    });

    return <Navigate to="/" replace />;
  }

  if (!userId || !role) {
    sessionStorage.clear();

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
