"use client"

import { useState } from "react"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Admin Dashboard",
    siteDescription: "Comprehensive admin dashboard for content management",
    logo: null,
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    notifyOnNewUser: true,
    notifyOnNewContent: true,
    digestFrequency: "daily",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    minimumPasswordLength: 8,
  })

  const handleGeneralSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNotificationSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseInt(value) : value,
    })
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Settings</h1>

      <div className="tab-container">
        <div className="tabs">
          <div className={`tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
            General
          </div>
          <div
            className={`tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </div>
          <div className={`tab ${activeTab === "security" ? "active" : ""}`} onClick={() => setActiveTab("security")}>
            Security
          </div>
          <div
            className={`tab ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            Appearance
          </div>
          <div className={`tab ${activeTab === "advanced" ? "active" : ""}`} onClick={() => setActiveTab("advanced")}>
            Advanced
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
              <label htmlFor="logo">Logo</label>
              <input type="file" id="logo" name="logo" className="search-input" accept="image/*" />
              <small>Recommended size: 200x50 pixels</small>
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                className="search-input"
                value={generalSettings.timezone}
                onChange={handleGeneralSettingsChange}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Standard Time (EST)</option>
                <option value="CST">Central Standard Time (CST)</option>
                <option value="PST">Pacific Standard Time (PST)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateFormat">Date Format</label>
              <select
                id="dateFormat"
                name="dateFormat"
                className="search-input"
                value={generalSettings.dateFormat}
                onChange={handleGeneralSettingsChange}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <button className="button button-primary" style={{ marginTop: "20px" }}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationSettingsChange}
                />
                Enable Email Notifications
              </label>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onChange={handleNotificationSettingsChange}
                />
                Enable Push Notifications
              </label>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifyOnNewUser"
                  checked={notificationSettings.notifyOnNewUser}
                  onChange={handleNotificationSettingsChange}
                />
                Notify on New User Registration
              </label>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifyOnNewContent"
                  checked={notificationSettings.notifyOnNewContent}
                  onChange={handleNotificationSettingsChange}
                />
                Notify on New Content Upload
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="digestFrequency">Email Digest Frequency</label>
              <select
                id="digestFrequency"
                name="digestFrequency"
                className="search-input"
                value={notificationSettings.digestFrequency}
                onChange={handleNotificationSettingsChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </select>
            </div>

            <button className="button button-primary" style={{ marginTop: "20px" }}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onChange={handleSecuritySettingsChange}
                />
                Enable Two-Factor Authentication
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
              <input
                type="number"
                id="sessionTimeout"
                name="sessionTimeout"
                className="search-input"
                value={securitySettings.sessionTimeout}
                onChange={handleSecuritySettingsChange}
                min="5"
                max="120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordExpiry">Password Expiry (days)</label>
              <input
                type="number"
                id="passwordExpiry"
                name="passwordExpiry"
                className="search-input"
                value={securitySettings.passwordExpiry}
                onChange={handleSecuritySettingsChange}
                min="0"
                max="365"
              />
              <small>Set to 0 for no expiry</small>
            </div>

            <div className="form-group">
              <label htmlFor="minimumPasswordLength">Minimum Password Length</label>
              <input
                type="number"
                id="minimumPasswordLength"
                name="minimumPasswordLength"
                className="search-input"
                value={securitySettings.minimumPasswordLength}
                onChange={handleSecuritySettingsChange}
                min="6"
                max="20"
              />
            </div>

            <button className="button button-primary" style={{ marginTop: "20px" }}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="settings-form">
            <p>Appearance settings will be implemented here.</p>
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="settings-form">
            <p>Advanced settings will be implemented here.</p>
          </div>
        )}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
  <button
    className="button"
    onClick={() => {
      // Clear session or token logic here
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login" // Or redirect with useRouter if using Next.js router
    }}
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
    Logout
  </button>
</div>

      </div>

    </div>
  )
}

export default Settings