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
            <FaBell className="notification-icon" />
          </div>
        </div>
      </div>

      <ChildAccounts />
    </div>
  );
};

export default SubAccountManagement;
