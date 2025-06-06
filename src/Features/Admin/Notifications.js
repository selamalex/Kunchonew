"use client";
import "./admin.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [inAppCount, setInAppCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [newNotification, setNewNotification] = useState({
    type: "",
    message: "",
  });

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admins/notifications",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Fetched notifications response:", response.data);

      // Ensure notifications is set to an array
      const notiArray = Array.isArray(response.data)
        ? response.data
        : response.data.notifications || [];

      setNotifications(notiArray);
      setTotalCount(notiArray.length);
      setInAppCount(notiArray.filter((n) => n.type === "in-app").length);
      setEmailCount(notiArray.filter((n) => n.type === "email").length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admins/notifications/${id}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setNotifications((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        setTotalCount(updated.length);
        setInAppCount(updated.filter((n) => n.type === "in-app").length);
        setEmailCount(updated.filter((n) => n.type === "email").length);
        return updated;
      });
      setStatusMessage("Notification deleted successfully!");
      setStatusType("success");
    } catch (error) {
      console.error("Error deleting notification:", error);
      setStatusMessage("Failed to delete notification.");
      setStatusType("error");
    }
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleChange = (e) => {
    setNewNotification({ ...newNotification, [e.target.name]: e.target.value });
  };

  const handleCreateNotification = async () => {
    try {
      const payload = {
        adminId: user.id,
        type: newNotification.type,
        message: newNotification.message,
      };

      const response = await axios.post(
        "http://localhost:3000/api/admins/notifications/send",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const today = new Date().toISOString().split("T")[0];
      const newNoti = {
        id: response.data.id || notifications.length + 1,
        adminName: `${user.firstName} ${user.lastName}`,
        type: newNotification.type,
        message: newNotification.message,
        timestamp: today,
      };

      setNotifications((prev) => [...prev, newNoti]);
      setNewNotification({ type: "", message: "" });
      setShowPopup(false);
      setStatusMessage("Notification sent to all parents successfully!");
      setStatusType("success");
    } catch (error) {
      console.error("Error sending notification:", error);
      setStatusMessage("Failed to send notification.");
      setStatusType("error");
    }
  };
  const filteredNotifications = notifications.filter((n) =>
    activeTab === "all" ? true : n.type === activeTab
  );

  return (
    <>
      <div className={`page-container ${showPopup ? "notif-blurred" : ""}`}>
        <h1 className="page-header">Notifications</h1>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-title">Total Notifications</div>
            <div className="stat-value">{totalCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">In-App Notifications</div>
            <div className="stat-value">{inAppCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Email Notifications</div>
            <div className="stat-value">{emailCount}</div>
          </div>
        </div>

        <div className="tab-container">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </div>
            <div
              className={`tab ${activeTab === "in-app" ? "active" : ""}`}
              onClick={() => setActiveTab("in-app")}
            >
              In-App
            </div>
            <div
              className={`tab ${activeTab === "email" ? "active" : ""}`}
              onClick={() => setActiveTab("email")}
            >
              Email
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <button className="button button-primary" onClick={openPopup}>
              Create Notification
            </button>

            <input
              type="text"
              className="search-input"
              placeholder="Search"
              style={{ width: "250px" }}
            />
          </div>

          {statusMessage && (
            <div
              className={`status-message ${
                statusType === "success" ? "success" : "error"
              }`}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                color: statusType === "success" ? "#155724" : "#721c24",
                backgroundColor:
                  statusType === "success" ? "#d4edda" : "#f8d7da",
                border: `1px solid ${
                  statusType === "success" ? "#c3e6cb" : "#f5c6cb"
                }`,
              }}
            >
              {statusMessage}
            </div>
          )}

          <table className="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Admin Name</th>
                <th>Type</th>
                <th>Message</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notification) => (
                <tr key={notification.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{notification.adminName}</td>
                  <td>{notification.type}</td>
                  <td>{notification.message}</td>
                  <td>{new Date(notification.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => handleDeleteNotification(notification.id)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div className="notif-popup-overlay" onClick={closePopup}>
          <div className="notif-popup" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#000" }}>Create Notification</h2>

            <label style={{ color: "#000" }}>
              Type
              <input
                type="text"
                name="type"
                value={newNotification.type}
                onChange={handleChange}
                placeholder="Enter type"
                className="notif-popup-input"
              />
            </label>

            <label style={{ color: "#000" }}>
              Message
              <textarea
                name="message"
                value={newNotification.message}
                onChange={handleChange}
                placeholder="Enter message"
                className="notif-popup-textarea"
              />
            </label>

            <div className="notif-popup-buttons">
              <button className="button" onClick={closePopup}>
                Cancel
              </button>
              <button
                className="button button-primary"
                onClick={handleCreateNotification}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
