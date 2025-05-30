import { useState } from "react"

const Contents = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [contents, setContents] = useState([
    { id: 1, title: "Introduction to Math", category: "Books", status: "Published", date: "2023-05-15" },
    { id: 2, title: "Classical Music Collection", category: "Music", status: "Published", date: "2023-06-20" },
    { id: 3, title: "Science Experiments", category: "Videos", status: "Draft", date: "2023-07-10" },
    { id: 4, title: "History Timeline", category: "Others", status: "Published", date: "2023-08-05" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newContent, setNewContent] = useState({
    title: "",
    category: "Books",
    status: "Draft",
    date: "",
    file: null,
  })

  const handleDeleteContent = (id) => {
    setContents(contents.filter((content) => content.id !== id))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewContent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setNewContent((prev) => ({
      ...prev,
      file: e.target.files[0],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newContent.title || !newContent.date) {
      alert("Please fill in Title and Date")
      return
    }
    const newId = contents.length ? Math.max(...contents.map(c => c.id)) + 1 : 1
    setContents((prev) => [
      ...prev,
      {
        id: newId,
        title: newContent.title,
        category: newContent.category,
        status: newContent.status,
        date: newContent.date,
      },
    ])
    setNewContent({
      title: "",
      category: "Books",
      status: "Draft",
      date: "",
      file: null,
    })
    setShowModal(false)
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Content Management</h1>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-title">Total Contents</div>
          <div className="stat-value">671</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Books</div>
          <div className="stat-value">150</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Music</div>
          <div className="stat-value">220</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Videos</div>
          <div className="stat-value">250</div>
        </div>
      </div>

      <div className="tab-container">
        <div className="tabs">
          <div className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All</div>
          <div className={`tab ${activeTab === "books" ? "active" : ""}`} onClick={() => setActiveTab("books")}>Books</div>
          <div className={`tab ${activeTab === "music" ? "active" : ""}`} onClick={() => setActiveTab("music")}>Music</div>
          <div className={`tab ${activeTab === "videos" ? "active" : ""}`} onClick={() => setActiveTab("videos")}>Videos</div>
          <div className={`tab ${activeTab === "others" ? "active" : ""}`} onClick={() => setActiveTab("others")}>Others</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <button className="button button-primary" onClick={() => setShowModal(true)}>Add New Content</button>
          <input type="text" className="search-input" placeholder="Search" style={{ width: "250px" }} />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents
              .filter((content) => activeTab === "all" ? true : content.category.toLowerCase() === activeTab)
              .map((content) => (
                <tr key={content.id}>
                  <td><input type="checkbox" /></td>
                  <td>{content.title}</td>
                  <td>{content.category}</td>
                  <td><span className={`status-badge ${content.status.toLowerCase()}`}>{content.status}</span></td>
                  <td>{content.date}</td>
                  <td>
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
                    >Edit</button>
                    <button
                      className="action-button"
                      onClick={() => handleDeleteContent(content.id)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {showModal && (
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
          onClick={() => setShowModal(false)} // close on clicking outside form
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside form
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              width: "350px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h2>Add New Content</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newContent.title}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label>Category</label>
                <select
                  name="category"
                  value={newContent.category}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="Books">Books</option>
                  <option value="Music">Music</option>
                  <option value="Videos">Videos</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label>Status</label>
                <select
                  name="status"
                  value={newContent.status}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={newContent.date}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label>Upload File</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <div style={{ textAlign: "right" }}>
                <button type="submit" className="button button-primary" style={{ marginRight: "10px" }}>
                  Add
                </button>
                <button type="button" className="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contents
