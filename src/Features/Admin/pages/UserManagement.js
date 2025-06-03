import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("admin");
  const [users, setUsers] = useState([]);
  const [parents, setParents] = useState([]);
  const [childrens, setChildrens] = useState([]);

  const fetchUsersByRole = async (role, setter) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admins/users?role=${role}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setter(res.data);
    } catch (error) {
      console.error(`Error fetching ${role}s:`, error);
    }
  };

  useEffect(() => {
    fetchUsersByRole("admin", setUsers);
    fetchUsersByRole("parent", setParents);
    fetchUsersByRole("child", setChildrens);
  }, []);

  const handleDeleteUser = (id, setter) => {
    setter((prev) => prev.filter((user) => user.id !== id));
  };

  const renderTable = (data, role, onDelete) => (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>{role.charAt(0).toUpperCase() + role.slice(1)}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="user-circle"
                  style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                >
                  <i className="fas fa-user"></i>
                </div>
                {user.firstName || user.name} {user.lastName || ""}
              </div>
            </td>
            <td style={{ textAlign: "right" }}>
              <button
                className="action-button"
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                Edit
              </button>
              <button
                className="action-button"
                onClick={() => onDelete(user.id)}
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
  );

  return (
    <div className="page-container">
      <h1 className="page-header">User Management</h1>

      <div className="user-stats-container">
        <div className="user-stat-card">
          <div className="user-stat-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="user-stat-info">
            <div className="user-stat-label">Parents</div>
            <div className="user-stat-value">{parents.length}</div>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon">
            <i className="fas fa-child"></i>
          </div>
          <div className="user-stat-info">
            <div className="user-stat-label">Children</div>
            <div className="user-stat-value">{childrens.length}</div>
          </div>
        </div>
      </div>

      <div className="tab-container">
        <div className="tabs">
          {["admin", "parents", "children"].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
              <span className="tab-badge">
                {tab === "admin"
                  ? users.length
                  : tab === "parents"
                  ? parents.length
                  : childrens.length}
              </span>
            </div>
          ))}
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            style={{ marginLeft: "auto" }}
          />
        </div>

        {activeTab === "admin" && (
          <>
            <button
              className="button button-primary"
              style={{ marginBottom: "20px" }}
            >
              Create Admin Account
            </button>
            {renderTable(users, "Admins", (id) =>
              handleDeleteUser(id, setUsers)
            )}
          </>
        )}

        {activeTab === "parents" &&
          renderTable(parents, "Parents", (id) =>
            handleDeleteUser(id, setParents)
          )}

        {activeTab === "children" &&
          renderTable(childrens, "Children", (id) =>
            handleDeleteUser(id, setChildrens)
          )}
      </div>
    </div>
  );
};

export default UserManagement;
