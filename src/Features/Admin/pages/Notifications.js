"use client"

import { useState } from "react"

const Notifications = () => {
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
  ])

  const [activeTab, setActiveTab] = useState("all")

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Notifications</h1>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-title">Total Notifications</div>
          <div className="stat-value">156</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Sent</div>
          <div className="stat-value">120</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Scheduled</div>
          <div className="stat-value">25</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Draft</div>
          <div className="stat-value">11</div>
        </div>
      </div>

      <div className="tab-container">
        <div className="tabs">
          <div className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All
          </div>
          <div className={`tab ${activeTab === "sent" ? "active" : ""}`} onClick={() => setActiveTab("sent")}>
            Sent
          </div>
          <div className={`tab ${activeTab === "scheduled" ? "active" : ""}`} onClick={() => setActiveTab("scheduled")}>
            Scheduled
          </div>
          <div className={`tab ${activeTab === "draft" ? "active" : ""}`} onClick={() => setActiveTab("draft")}>
            Draft
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <button className="button button-primary">Create Notification</button>
          <input type="text" className="search-input" placeholder="Search" style={{ width: "250px" }} />
        </div>

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
                if (activeTab === "all") return true
                return notification.status.toLowerCase() === activeTab
              })
              .map((notification) => (
                <tr key={notification.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                  <td>
                    <span className={`status-badge ${notification.status.toLowerCase()}`}>{notification.status}</span>
                  </td>
                  <td>{notification.recipients}</td>
                  <td>{notification.date}</td>
                  <td>
                    <button className="action-button" style={{
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}>Edit</button>
                    <button className="action-button" onClick={() => handleDeleteNotification(notification.id)} style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notifications