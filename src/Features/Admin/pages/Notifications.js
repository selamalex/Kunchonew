"use client";
import "../components/admin.css";
import { useState } from "react";

const Notifications = () => {
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
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleChange = (e) => {
    setNewNotification({ ...newNotification, [e.target.name]: e.target.value });
  };

  const handleCreateNotification = () => {
    const newId = notifications.length + 1;
    setNotifications([
      ...notifications,
      {
        id: newId,
        ...newNotification,
      },
    ]);
    setNewNotification({ adminName: "", type: "", message: "", timestamp: "" });
    setShowPopup(false);
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

          <table className="table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
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
                  <td><input type="checkbox" /></td>
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
              <input
                type="text"
                name="type"
                onChange={handleChange}
                placeholder="Enter type"
                className="notif-popup-input"
              />
            </label>

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
              <button className="button" onClick={closePopup}>Cancel</button>
              <button className="button button-primary" onClick={handleCreateNotification}>
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
