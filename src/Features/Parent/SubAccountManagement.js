import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaArrowLeft, FaSearch, FaBell } from "react-icons/fa";
import "./GreetingSection.css";
import ChildAccounts from "./ChildAccounts";
const SubAccountManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={() => navigate("/parent/dashboard")}>
        <FaArrowLeft className="back-icon" />
        <span>Back </span>
      </div>

      {/* Greeting Section */}
      <div className="greeting-section">
        <div className="greeting-text">
          <h2>Hello Tsedi,</h2>
          <p>Your Child activities and progress are updated here</p>
        </div>

        <div className="greeting-actions">
          <div className="top-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <FaSearch className="search-icon" />
            </div>
            <FaBell className="notification-icon" />
          </div>

          <button className="start-time-btn">
            <FaClock style={{ marginRight: "8px" }} />
            Start Time Limit
          </button>
        </div>
      </div>
      <ChildAccounts></ChildAccounts>
    </div>
  );
};

export default SubAccountManagement;
