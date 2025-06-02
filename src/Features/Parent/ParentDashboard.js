import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../Components/LogoutButton";
import { AuthContext } from "../../Context/AuthContext";
import "./Sidebar.css";
import { FaTachometerAlt, FaClock, FaBars } from "react-icons/fa";
import logo from "../../Assets/images/logo.png";

const ParentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile toggle button */}
      {/* Mobile toggle button */}
      <button className="sidebar-hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul>
          <li>
            <Link to="/parent/subaccounts">
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime">
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="greeting-section">
          <div className="greeting-text">
            <h2>Hello {user.firstName},</h2>
            <p>Your Child activities and progress are updated here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
