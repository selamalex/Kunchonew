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
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/parents/me",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (user?.token) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div className="dashboard-wrapper">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={() => navigate("/parent/dashboard")}>
        <FaArrowLeft className="back-icon" />
        <span>Back</span>
      </div>

      {/* Greeting Section */}
      <div className="greeting-section">
        <div className="greeting-text">
          <h2>Hello {profile?.firstName || "User"},</h2>
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

      <ChildAccounts />
    </div>
  );
};

export default SubAccountManagement;
