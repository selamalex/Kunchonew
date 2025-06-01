import { NavLink } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Logo</div>

      <div className="admin-info">
        <div className="admin-avatar">
          <i className="fas fa-user"></i>
        </div>
        <span className="admin-text">Admin</span>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Dashboards</div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <div className="sidebar-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/user-management"
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
          >
            <div className="sidebar-icon">
              <i className="fas fa-users"></i>
            </div>
            <span>User Management</span>
          </NavLink>

          <NavLink to="/contents" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <div className="sidebar-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <span>Content Management</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
          >
            <div className="sidebar-icon">
              <i className="fas fa-bell"></i>
            </div>
            <span>Notifications</span>
          </NavLink>

          <NavLink to="/reports" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <div className="sidebar-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <span>Reports</span>
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <div className="sidebar-icon">
              <i className="fas fa-cog"></i>
            </div>
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar

