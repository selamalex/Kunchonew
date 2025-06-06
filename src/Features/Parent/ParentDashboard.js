import { useContext, useState } from "react";
import {
  FaClock,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import LogoutButton from "../../Components/LogoutButton";
import { AuthContext } from "../../Context/AuthContext";
import "../Parent/Parent.css";
import "./Sidebar.css";

const ParentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();

  const getCurrentTitle = () => {
    switch (location.pathname) {
      case "/parent/dashboard":
        return "Dashboard";
      case "/parent/subaccounts":
        return "Sub Account Management";
      case "/parent/screentime":
        return "Screen Time Report";
      default:
        return "Dashboard";
    }
  };

  const handleDeleteAccount = () => {
    // TODO: Actual delete logic
    console.log("Account deleted");
    setShowConfirmModal(false);
  };

  return (
    <div className="dashboard-container">
      <button
        className="sidebar-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-title">
            <Link to="/parent/dashboard" onClick={() => setSidebarOpen(false)}>
              <FaTachometerAlt />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/parent/subaccounts"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime" onClick={() => setSidebarOpen(false)}>
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <LogoutButton />
          <button
            className="delete-account-text"
            onClick={() => setShowConfirmModal(true)}
          >
            <FaTrashAlt style={{ marginRight: "8px" }} />
            Delete Account
          </button>
        </div>
      </div>

      <div className="main-content">
        <p>Your child's activities and progress are updated here.</p>
        <Outlet />
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Are you sure you want to delete your account?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDeleteAccount}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
