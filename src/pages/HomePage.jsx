// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome to the Ship Maintenance Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Monitor and manage your ships, components, and maintenance jobs all in one place.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
