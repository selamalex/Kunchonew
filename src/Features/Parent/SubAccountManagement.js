import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaArrowLeft, FaSearch, FaBell } from "react-icons/fa";
import "./GreetingSection.css";
import ChildAccounts from "./ChildAccounts";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const SubAccountManagement = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications"); // adjust as needed
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    if (!showNotifications) fetchNotifications();
  };

  return (
    <div className="dashboard-wrapper">
      <div className="back-arrow" onClick={() => navigate("/parent/dashboard")}>
        <FaArrowLeft className="back-icon" />
        <span>Back</span>
      </div>

      <div className="greeting-section">
        <div className="greeting-text">
          <h2>Hello {user.firstName},</h2>
          <p>Your Child activities and progress are updated here</p>
        </div>

        <div className="greeting-actions">
          <div className="top-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <FaSearch className="search-icon" />
            </div>
            <div className="notification-wrapper">
              <FaBell
                className="notification-icon"
                onClick={handleNotificationClick}
              />
              {showNotifications && (
                <div className="notification-popup">
                  {notifications.length === 0 ? (
                    <p className="empty-text">No notifications</p>
                  ) : (
                    notifications.map((note) => (
                      <div key={note.id} className="notification-item">
                        {note.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ChildAccounts />
    </div>
  );
};

export default SubAccountManagement;
