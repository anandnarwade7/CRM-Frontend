import React from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center flex-col text-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        🚧 Page Under Development
      </h1>
      <p className="text-lg text-gray-600">
        This page is currently under construction. Please check back later or
        navigate to an existing section of the app.
      </p>
      <Button variant="link" onClick={() => navigate(-1)}>
        go back
      </Button>
    </div>
  );
};

export default NotFound;
