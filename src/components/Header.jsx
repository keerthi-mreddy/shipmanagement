// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#001f3f] text-white px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-orange-400 transition">Ship Maintenance</Link>
      </div>

      <div className="space-x-4 flex items-center">
        {!user ? (
          <Link to="/login" className="hover:text-orange-400 transition">Login</Link>
        ) : (
          <>
            <span className="font-medium">{user.role}</span>
            <Link to="/dashboard" className="hover:text-orange-400 transition">Dashboard</Link>
            <Link to="/ships" className="hover:text-orange-400 transition">Ships</Link>
            {user.role === "Admin" && (
              <Link to="/ships/new" className="hover:text-orange-400 transition">Add Ship</Link>
            )}
            <Link to="/components" className="hover:text-orange-400 transition">Components</Link>
            {user.role === "Admin" && (
              <Link to="/components/new" className="hover:text-orange-400 transition">Add Component</Link>
            )}
            <Link to="/jobs" className="hover:text-orange-400 transition">Jobs</Link>
            <Link to="/jobs/calendar" className="hover:text-orange-400 transition">Job Calendar</Link>
            {user.role === "Admin" && (
              <Link to="/jobs/new" className="hover:text-orange-400 transition">Add Job</Link>
            )}
            <Link to="/notifications" className="hover:text-orange-400 transition">Notification Center</Link>
            <button
              onClick={handleLogout}
              className="hover:text-orange-400 transition text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
