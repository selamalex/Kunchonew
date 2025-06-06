import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import LogoutButton from "../../Components/LogoutButton";
import { FaTachometerAlt, FaClock, FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../Assets/images/logo.png";
import "./Sidebar.css";
import "./ParentLayout.css";

const ParentLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const pageTitles = {
    "/parent/dashboard": "Dashboard",
    "/parent/subaccounts": "Sub Account Management",
    "/parent/screentime": "Screen Time Report",
  };

  const currentTitle = pageTitles[location.pathname] || "";

  useEffect(() => {
    setNotifications([
      { id: 1, message: "Screen time reached 2 hrs" },
      { id: 2, message: "New update available" },
    ]);
  }, []);

  const handleDeleteAccount = () => {
    // Add backend request here
    alert("Account deletion triggered.");
  };

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
        <div className="top-bar">
          <h3 className="section-title">{currentTitle}</h3>
          <div className="right-section">
            <span className="greeting">Hello, {user.firstName}!</span>

            {/* Notification icon */}
            <div className="notification-wrapper">
              <FaBell
                className="icon"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div className="dropdown notification-popup">
                  {notifications.length === 0 ? (
                    <p className="empty-msg">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="dropdown-item">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Profile icon */}
            <div className="profile-wrapper">
              <FaUserCircle
                className="icon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              {showProfileMenu && (
                <div className="dropdown profile-popup">
                  <div className="dropdown-item username">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="dropdown-item">
                    <LogoutButton />
                  </div>
                  <div
                    className="dropdown-item delete-btn"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ParentLayout;
