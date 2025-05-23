import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../Components/LogoutButton";

import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaClock,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../Assets/images/logo.png";

const ParentDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
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
      <div className="main-content">
        <h2 className="text-xl mb-4">
          {" "}
          <div className="greeting-section">
            <div className="greeting-text">
              <h2>Hello Tsedi,</h2>
              <p>Your Child activities and progress are updated here</p>
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default ParentDashboard;
