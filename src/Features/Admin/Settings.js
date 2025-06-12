"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Settings = () => {
  const [deleteCredentials, setDeleteCredentials] = useState({
    email: "",
    password: "",
  });
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("general");
  const [resetEmail, setResetEmail] = useState("");

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Kuncho",
    siteDescription:
      "A children entertainment app focused on giving local based entertainment.",
    logo: null,
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleResetPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/parents/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: resetEmail }),
        }
      );

      if (response.ok) {
        alert("Password reset email sent successfully!");
      } else {
        const errorData = await response.json();
        alert(
          "Error resetting password: " +
            (errorData.message || response.statusText)
        );
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false);

    const token = localStorage.getItem("token"); // Or get from context

    try {
      const response = await fetch(
        "http://localhost:3000/api/parents/account",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Add this line
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: deleteCredentials.email,
            password: deleteCredentials.password,
          }),
        }
      );

      if (response.ok) {
        alert("Account deleted successfully.");
        // Optionally redirect user or clear state/localStorage
      } else {
        const errorData = await response.json();
        alert(
          "Error deleting account: " +
            (errorData.message || response.statusText)
        );
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  const handleDeleteAccount = () => {
    setShowConfirmModal(true);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleInputChange = (e) => {
    setDeleteCredentials({
      ...deleteCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Settings</h1>

      <div className="tab-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </div>
        </div>

        {activeTab === "general" && (
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                className="search-input"
                value={generalSettings.siteName}
                onChange={handleGeneralSettingsChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="siteDescription">Site Description</label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                className="search-input"
                value={generalSettings.siteDescription}
                onChange={handleGeneralSettingsChange}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resetEmail">Reset Password Email</label>
              <input
                type="email"
                id="resetEmail"
                name="resetEmail"
                className="search-input"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginTop: "30px" }}>
              <button
                onClick={handleResetPassword}
                className="button"
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Reset Password
              </button>

              <button
                onClick={handleDeleteAccount}
                className="button"
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Account Deletion</h3>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={deleteCredentials.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={deleteCredentials.password}
              onChange={handleInputChange}
            />
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: "#dc3545", color: "#fff" }}
            >
              Confirm Delete
            </button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
