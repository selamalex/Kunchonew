import { useContext, useState } from "react";
import { FaClock, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import LogoutButton from "../../Components/LogoutButton";
import { AuthContext } from "../../Context/AuthContext";
import "../Parent/Parent.css";
import "./Sidebar.css";

const ParentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine current title based on route
  const getCurrentTitle = () => {
    switch (location.pathname) {
      case "/parent/dashboard":
        return "Dashboard";
      case "/parent/subaccounts":
        return "Sub Account Management";
      case "/parent/screentime":
        return "Screen Time Report";
      default:
        return "Dashboard";
    }
  };

  const currentTitle = getCurrentTitle();

  return (
    <div className="dashboard-container">
      {/* Hamburger menu (mobile only) */}
      <button
        className="sidebar-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-title">
            <Link to="/parent/dashboard" onClick={() => setSidebarOpen(false)}>
              <FaTachometerAlt />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/parent/subaccounts"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime" onClick={() => setSidebarOpen(false)}>
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>
        <div className="logout">
          <LogoutButton />
        </div>
      </div>

      <div className="main-content">
        <p>Your child's activities and progress are updated here.</p>
      </div>
    </div>
  );
};

export default ParentDashboard;
