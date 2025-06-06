"use client";
import "./admin.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      adminName: "Admin A",
      type: "System Update",
      message: "The system will be updated on June 15th.",
      timestamp: "2023-06-10",
    },
    {
      id: 2,
      adminName: "Admin B",
      type: "New Content",
      message: "Check out our new educational videos!",
      timestamp: "2023-06-20",
    },
    {
      id: 3,
      adminName: "Admin C",
      type: "Maintenance",
      message: "Brief maintenance scheduled for tomorrow.",
      timestamp: "2023-06-12",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [newNotification, setNewNotification] = useState({
    adminName: "",
    type: "",
    message: "",
    timestamp: "",
  });

  const handleDeleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
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

      const newId = notifications.length + 1;
      const today = new Date().toISOString().split("T")[0];

      setNotifications([
        ...notifications,
        {
          id: newId,
          adminName: `${user.firstName} ${user.lastName}`,
          type: newNotification.type,
          message: newNotification.message,
          timestamp: today,
        },
      ]);

      setNewNotification({ type: "", message: "", timestamp: "" });
      setShowPopup(false);

      setStatusMessage("Notification sent to all parents successfully!");
      setStatusType("success");
    } catch (error) {
      console.error("Error sending notification:", error);
      setStatusMessage("Failed to send notification.");
      setStatusType("error");
    }
  };

  return (
    <>
      <div className={`page-container ${showPopup ? "notif-blurred" : ""}`}>
        <h1 className="page-header">Notifications</h1>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-title">Total Notifications</div>
            <div className="stat-value">{notifications.length}</div>
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
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{notification.adminName}</td>
                  <td>{notification.type}</td>
                  <td>{notification.message}</td>
                  <td>{notification.timestamp}</td>
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

      {/* Notification Popup Modal */}
      {showPopup && (
        <div className="notif-popup-overlay" onClick={closePopup}>
          <div className="notif-popup" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#000" }}>Create Notification</h2>

            <label style={{ color: "#000" }}>
<<<<<<< HEAD
              Admin Name
              <input
                type="text"
                name="adminName"
                onChange={handleChange}
                placeholder="Enter admin name"
                className="notif-popup-input"
              />
            </label>

            <label style={{ color: "#000" }}>
  Type
  <select
    name="type"
    onChange={handleChange}
    className="notif-popup-input"
    defaultValue=""
  >
    <option value="" disabled>Select type</option>
    <option value="email">Email</option>
    <option value="in-app">In-app</option>
  </select>
</label>

=======
              Type
              <input
                type="text"
                name="type"
                onChange={handleChange}
                placeholder="Enter type"
                className="notif-popup-input"
              />
            </label>
>>>>>>> 4c16bd54cf083d97497501dbc09f990a20b74a9d

            <label style={{ color: "#000" }}>
              Message
              <textarea
                name="message"
                onChange={handleChange}
                placeholder="Enter message"
                className="notif-popup-textarea"
              />
            </label>

            <label style={{ color: "#000" }}>
              Timestamp
              <input
                type="date"
                name="timestamp"
                onChange={handleChange}
                className="notif-popup-input"
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
