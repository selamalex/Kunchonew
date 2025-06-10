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

  const renderTable = (data, role) => (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>{role}</th>
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
  const CreateAdminModal = ({ onClose, onSuccess, token }) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3000/api/admins", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        onSuccess?.();
        onClose();
      } catch (err) {
        console.error("Error creating admin:", err);
        alert(err.response?.data?.error || "Something went wrong");
      }
    };
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            width: "350px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <h2
            style={{ marginBottom: "20px", textAlign: "center", color: "#333" }}
          >
            Create Admin Account
          </h2>
          <form onSubmit={handleSubmit}>
            {["firstName", "lastName", "email", "password"].map((field) => (
              <input
                key={field}
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={formData[field]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1.5px solid #ccc",
                  fontSize: "16px",
                  transition: "border-color 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            ))}

            <div
              className="modal-actions"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                type="submit"
                className="button button-primary"
                style={{
                  backgroundColor: "#007BFF",
                  border: "none",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                  flex: 1,
                  marginRight: "10px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007BFF")
                }
              >
                Create Admin
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={onClose}
                style={{
                  backgroundColor: "#6c757d",
                  border: "none",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                  flex: 1,
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#565e64")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6c757d")
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

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
            {
              <button
                className="button button-primary"
                style={{ marginBottom: "20px" }}
                onClick={() => setShowAdminModal(true)}
              >
                Create Admin Account
              </button>
            }
            {renderTable(users, "Admins")}
          </>
        )}

        {activeTab === "parents" && renderTable(parents, "Parents")}
        {activeTab === "children" && renderTable(childrens, "Children")}
      </div>

      {/* Pop-up Edit Form */}
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

            <label>Change Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleFormChange}
              placeholder="Enter new password"
            />

            <div className="popup-buttons">
              <button onClick={handleSave} className="btn btn-add">
                Save
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="btn btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
      {showAdminModal && (
        <CreateAdminModal
          onClose={() => setShowAdminModal(false)}
          token={user.token}
          onSuccess={() => fetchUsersByRole("admin", setUsers)}
        />
      )}
    </div>
  );
};

export default UserManagement;
