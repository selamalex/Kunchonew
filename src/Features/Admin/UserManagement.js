import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("admin");
  const [users, setUsers] = useState([]);
  const [parents, setParents] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });

  const fetchUsersByRole = async (role, setter) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/admins/users?role=${role}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setter(res.data);
    } catch (error) {
      console.error(`Error fetching ${role}s:`, error);
    }
  };

  useEffect(() => {
    fetchUsersByRole("admin", setUsers);
    fetchUsersByRole("parent", setParents);
    fetchUsersByRole("child", setChildrens);
  }, [user.token]);

  const handleEditClick = (user) => {
    setEditUser(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      password: "",
    });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    setEditUser(null);
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admins/users",
        {
          name: adminForm.name,
          email: adminForm.email,
          password: adminForm.password,
          role: "admin",
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUsers((prevUsers) => [...prevUsers, res.data]);
      setAdminForm({ name: "", email: "", password: "" });
      setShowAdminModal(false);
    } catch (error) {
      console.error("Failed to add admin:", error);
      alert("Failed to add admin. Please try again.");
    }
  };

  const renderTable = (data, role) => (
    <table className="table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>{role}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id || user._id}>
            <td><input type="checkbox" /></td>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="user-circle" style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
                  <i className="fas fa-user"></i>
                </div>
                {user.name || `${user.firstName} ${user.lastName}`}
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
                }}
                onClick={() => handleEditClick(user)}
              >
                Edit
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
          <div className="user-stat-icon"><i className="fas fa-user"></i></div>
          <div className="user-stat-info">
            <div className="user-stat-label">Parents</div>
            <div className="user-stat-value">{parents.length}</div>
          </div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-icon"><i className="fas fa-child"></i></div>
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              onClick={() => setShowAdminModal(true)}
            >
              Create Admin Account
            </button>

            {showAdminModal && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
                onClick={() => setShowAdminModal(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: "white",
                    padding: "25px",
                    borderRadius: "10px",
                    width: "350px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <h2 style={{ color: "#000" }}>Add Admin Account</h2>
                  <form onSubmit={handleAddAdmin}>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ color: "#000" }}>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={adminForm.name}
                        onChange={handleAdminInputChange}
                        style={{ width: "100%", padding: "8px" }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ color: "#000" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={adminForm.email}
                        onChange={handleAdminInputChange}
                        style={{ width: "100%", padding: "8px" }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ color: "#000" }}>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={adminForm.password}
                        onChange={handleAdminInputChange}
                        style={{ width: "100%", padding: "8px" }}
                        required
                      />
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <button
                        type="submit"
                        className="button button-primary"
                        style={{ marginRight: "10px" }}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={() => setShowAdminModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {renderTable(users, "Admins")}
          </>
        )}

        {activeTab === "parents" && renderTable(parents, "Parents")}
        {activeTab === "children" && renderTable(childrens, "Children")}
      </div>

      {editUser && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup-form">
            <h2>Edit User</h2>
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleFormChange}
            />
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleFormChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleFormChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditUser(null)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
