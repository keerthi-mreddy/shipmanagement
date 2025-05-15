// src/pages/UnauthorizedPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-700 mt-2">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="mt-4 text-blue-600 underline hover:text-blue-800"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
