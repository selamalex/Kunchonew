import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import LogoutButton from "../../Components/LogoutButton";
import { FaTachometerAlt, FaClock, FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../Assets/images/logo.png";
import "./Sidebar.css";
import "./ParentLayout.css";
import axios from "axios";

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
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/parents/notifications",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // ensure this is the correct token
            },
          }
        );

        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [user.token]);
  useEffect(() => {
    const handleClickOutside = async (event) => {
      const notifWrapper = document.querySelector(".notification-wrapper");
      if (notifWrapper && !notifWrapper.contains(event.target)) {
        setShowNotifications(false);

        if (notifications.length > 0) {
          try {
            await axios.put(
              "http://localhost:3000/api/parents/notifications/mark-read",
              {},
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            setNotifications([]);
          } catch (error) {
            console.error("Failed to mark notifications as read:", error);
          }
        }
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, notifications, user.token]);

  const handleDeleteAccount = () => {
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
                onClick={() => setShowNotifications((prev) => !prev)}
              />

              {notifications.length > 0 && (
                <span className="notification-count">
                  {notifications.length}
                </span>
              )}
              {showNotifications && (
                <div className="dropdown notification-popup">
                  <span
                    onClick={async () => {
                      setShowNotifications(false);

                      if (notifications.length > 0) {
                        try {
                          await axios.put(
                            "http://localhost:3000/api/parents/notifications/mark-read",
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${user.token}`,
                              },
                            }
                          );
                          setNotifications([]);
                        } catch (error) {
                          console.error(
                            "Failed to mark notifications as read:",
                            error
                          );
                        }
                      }
                    }}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    ×
                  </span>

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
