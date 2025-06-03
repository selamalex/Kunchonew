"use client";
import '../components/admin.css';
import { useState } from "react";

const Notifications = () => {
  // Initial notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Update",
      message: "The system will be updated on June 15th.",
      status: "Sent",
      recipients: "All Users",
      date: "2023-06-10",
    },
    {
      id: 2,
      title: "New Content Available",
      message: "Check out our new educational videos!",
      status: "Scheduled",
      recipients: "Parents",
      date: "2023-06-20",
    },
    {
      id: 3,
      title: "Maintenance Notice",
      message: "Brief maintenance scheduled for tomorrow.",
      status: "Draft",
      recipients: "All Users",
      date: "2023-06-12",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [showPopup, setShowPopup] = useState(false);

  // State for the new notification form
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    status: "Draft",
    recipients: "",
    date: "",
  });

  // Delete notification by id
  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Open and close popup handlers
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  // Handle input changes for new notification form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({ ...prev, [name]: value }));
  };

  // Create new notification and add to list
  const handleCreateNotification = () => {
    // Simple validation
    if (
      !newNotification.title.trim() ||
      !newNotification.message.trim() ||
      !newNotification.recipients.trim() ||
      !newNotification.date
    ) {
      alert("Please fill all fields");
      return;
    }

    // Generate new id (assumes notifications are sorted by id ascending)
    const newId = notifications.length ? notifications[notifications.length - 1].id + 1 : 1;

    setNotifications((prev) => [...prev, { id: newId, ...newNotification }]);

    // Reset form
    setNewNotification({
      title: "",
      message: "",
      status: "Draft",
      recipients: "",
      date: "",
    });

    closePopup();
  };

  return (
    <>
      <div className={`page-container ${showPopup ? "blurred" : ""}`}>
        <h1 className="page-header">Notifications</h1>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-title">Total Notifications</div>
            <div className="stat-value">{notifications.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Sent</div>
            <div className="stat-value">
              {notifications.filter((n) => n.status === "Sent").length}
            </div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="tab-container">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </div>
            <div
              className={`tab ${activeTab === "sent" ? "active" : ""}`}
              onClick={() => setActiveTab("sent")}
            >
              Sent
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
              // Search functionality can be added here later
            />
          </div>

          {/* Notifications Table */}
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Title</th>
                <th>Message</th>
                <th>Status</th>
                <th>Recipients</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications
                .filter((notification) => {
                  if (activeTab === "all") return true;
                  return notification.status.toLowerCase() === activeTab;
                })
                .map((notification) => (
                  <tr key={notification.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{notification.title}</td>
                    <td>{notification.message}</td>
                    <td>
                      <span className={`status-badge ${notification.status.toLowerCase()}`}>
                        {notification.status}
                      </span>
                    </td>
                    <td>{notification.recipients}</td>
                    <td>{notification.date}</td>
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

      {/* Popup Modal */}
     {/*  {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking inside popup
            }}
          >
            <h2>Create Notification</h2>

            <label>
              Title
              <input
                type="text"
                name="title"
                value={newNotification.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="popup-input"
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={newNotification.message}
                onChange={handleChange}
                placeholder="Enter message"
                className="popup-textarea"
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={newNotification.status}
                onChange={handleChange}
                className="popup-select"
              >
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Sent">Sent</option>
              </select>
            </label>

            <label>
              Recipients
              <input
                type="text"
                name="recipients"
                value={newNotification.recipients}
                onChange={handleChange}
                placeholder="Enter recipients"
                className="popup-input"
              />
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={newNotification.date}
                onChange={handleChange}
                className="popup-input"
              />
            </label>

            <div className="popup-buttons">
              <button className="button" onClick={closePopup}>
                Cancel
              </button>
              <button className="button button-primary" onClick={handleCreateNotification}>
                Create
              </button> 
            </div>
          </div>
        </div>
      )}*/}
    </>
  );
};

export default Notifications;
