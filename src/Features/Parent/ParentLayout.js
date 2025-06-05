// ParentLayout.jsx
import React, { useContext } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import LogoutButton from "../../Components/LogoutButton";
import { FaTachometerAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import logo from "../../Assets/images/logo.png";
import "./Sidebar.css";
import "./ParentLayout.css";

const ParentLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // 1️⃣ Define route paths and page titles
  const pageTitles = {
    "/parent/dashboard": "Dashboard",
    "/parent/subaccounts": "Sub Account Management",
    "/parent/screentime": "Screen Time Report",
  };

  // 2️⃣ Get title based on current route
  const currentTitle = pageTitles[location.pathname] || "";

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul>
          <li>
            <Link to="/parent/dashboard">
              <FaTachometerAlt />
              Dashboard
            </Link>
          </li>
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

      <div className="main-content">
        {/* 3️⃣ Top Bar with Title and Greeting */}
        <div className="top-bar">
          <h3 className="section-title">{currentTitle}</h3>
          <div className="greeting-text"></div>
        </div>

        {/* 4️⃣ Outlet for child pages */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ParentLayout;
