

import { useState } from "react"

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("admin")
  const [users, setUsers] = useState([
    { id: 1, name: "Fiker", type: "admin" },
    { id: 2, name: "Selam", type: "admin" },
    { id: 3, name: "Tsedi", type: "admin" },
    { id: 4, name: "Sena", type: "admin" },
  ])

  const [childrens, setChildrens] = useState([
    { id: 1, name: "Pomy", type: "child" },
    { id: 2, name: "Kiki", type: "child" },
    { id: 3, name: "Tom", type: "child" },
  ])

  const [parents, setParents] = useState([
    { id: 1, name: "Dolly", type: "parent" },
    { id: 2, name: "Askalu", type: "parent" },
  ])

  const handleDeleteParent = (id) => {
    setParents(parents.filter((parent) => parent.id !== id))
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleDeleteChild = (id) => {
    setChildrens(childrens.filter((child) => child.id !== id))
  }

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
          <div className={`tab ${activeTab === "admin" ? "active" : ""}`} onClick={() => setActiveTab("admin")}>
            Admin <span className="tab-badge">{users.length}</span>
          </div>
          <div className={`tab ${activeTab === "parents" ? "active" : ""}`} onClick={() => setActiveTab("parents")}>
            Parents <span className="tab-badge">{parents.length}</span>
          </div>
          <div className={`tab ${activeTab === "children" ? "active" : ""}`} onClick={() => setActiveTab("children")}>
            Children <span className="tab-badge">{childrens.length}</span>
          </div>
        </div>

        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search" style={{ marginLeft: "auto" }} />
        </div>

        {activeTab === "admin" && (
          <>
            <button className="button button-primary" style={{ marginBottom: "20px" }}>
              Create Admin Account
            </button>

            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Accounts</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="user-circle" style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
                          <i className="fas fa-user"></i>
                        </div>
                        {user.name}
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
                        onClick={() => handleDeleteUser(user.id)}
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
          </>
        )}

        {activeTab === "parents" && <>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Parents</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="user-circle" style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
                          <i className="fas fa-user"></i>
                        </div>
                        {parent.name}
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
                        //onClick={() => handleDeleteUser(user.id)
                        onClick={() => handleDeleteParent(parent.id)
}                              
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
          </>}

        {activeTab === "children" && <>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Children</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {childrens.map((child) => (
                  <tr key={child.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="user-circle" style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
                          <i className="fas fa-user"></i>
                        </div>
                        {child.name}
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
                        onClick={() => handleDeleteChild(child.id)}
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
          </>}
      </div>
    </div>
  )
}

export default UserManagement