import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // adjust this path as needed
import "./Sidebar.css";
import LogoutButton from "../../Components/LogoutButton";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar-admin">
      <div className="logo-admin">Kuncho</div>

      <div className="admin-info">
        <div className="admin-avatar">
          <i className="fas fa-user"></i>
        </div>
        <span className="admin-text">
          {(user?.firstName || "Admin").toUpperCase()}
        </span>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Dashboards</div>
        <nav className="sidebar-nav">
          <NavLink
            to="/admin/overview"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <div className="sidebar-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
            <span>Overview</span>
          </NavLink>

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <div className="sidebar-icon">
                  <i className="fas fa-users"></i>
                </div>
                <span>User Management</span>
              </NavLink>

              <NavLink
                to="/admin/content"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <div className="sidebar-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <span>Content Management</span>
              </NavLink>

              <NavLink
                to="/admin/notifications"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <div className="sidebar-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <span>Notifications</span>
              </NavLink>

              <NavLink
                to="/admin/reports"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <div className="sidebar-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <span>Reports</span>
              </NavLink>

              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <div className="sidebar-icon">
                  <i className="fas fa-cog"></i>
                </div>
                <span>Settings</span>
              </NavLink>

              <LogoutButton className="logout-button" />
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
