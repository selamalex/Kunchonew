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
      const res = await axios.get("/api/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    if (!showNotifications) fetchNotifications();
  };

  return <ChildAccounts />;
};

export default SubAccountManagement;
