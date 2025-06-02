import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const Contents = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("all");
  const [contents, setContents] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState({
    title: "",
    category: "Books",
    ageGroup: "1", // updated from ageGroup
    date: "",
    file: null,
  });
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/content/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const formatted = data.map((item) => ({
            id: item.id,
            title: item.title,
            category: item.type, // mapping `type` to `category`
            ageGroup: item.ageGroup,
            date: new Date(item.createdAt).toISOString().split("T")[0], // format to YYYY-MM-DD
          }));
          setContents(formatted);
        } else {
          alert(
            "Failed to load contents: " + (data.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error fetching contents:", error);
        alert("An error occurred while fetching content.");
      }
    };

    fetchContents();
  }, [user.token]);

  const handleDeleteContent = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/content/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        setContents(contents.filter((content) => content.id !== id));
      } else {
        const error = await response.json();
        alert(
          "Failed to delete content: " + (error.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the content.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewContent((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, ageGroup, date, file } = newContent;

    if (!title || !date || !file) {
      alert("Please fill in Title, Date, and upload a File");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", category);
    formData.append("description", "");
    formData.append("ageGroup", ageGroup);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/api/admin/content", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          // Do NOT set Content-Type when sending FormData. Let the browser handle it.
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Add new content to UI
        const newId = contents.length
          ? Math.max(...contents.map((c) => c.id)) + 1
          : 1;
        setContents((prev) => [
          ...prev,
          {
            id: newId,
            title: result.title,
            category: result.type,
            ageGroup: ageGroup,
            date: date,
          },
        ]);
        setNewContent({
          title: "",
          category: "Books",
          ageGroup: "1",
          date: "",
          file: null,
        });
        setShowModal(false);
      } else {
        alert(
          "Failed to upload content: " + (result.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading content");
    }
  };

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
          <div
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          <div
            className={`tab ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            Books
          </div>
          <div
            className={`tab ${activeTab === "music" ? "active" : ""}`}
            onClick={() => setActiveTab("music")}
          >
            Music
          </div>
          <div
            className={`tab ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </div>
          <div
            className={`tab ${activeTab === "others" ? "active" : ""}`}
            onClick={() => setActiveTab("others")}
          >
            Others
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <button
            className="button button-primary"
            onClick={() => setShowModal(true)}
          >
            Add New Content
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            style={{ width: "250px" }}
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Title</th>
              <th>Category</th>
              <th>ageGroup</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents
              .filter((content) =>
                activeTab === "all"
                  ? true
                  : content.category.toLowerCase() === activeTab
              )
              .map((content) => (
                <tr key={content.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{content.title}</td>
                  <td>{content.category}</td>
                  <td>
                    <span
                      className={`status-badge ${content.ageGroup.toLowerCase()}`}
                    >
                      {content.ageGroup}
                    </span>
                  </td>
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
                    >
                      Edit
                    </button>
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
                    >
                      Delete
                    </button>
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
                  <option value="book">Books</option>
                  <option value="music">Music</option>
                  <option value="video">Videos</option>
                  <option value="other">Others</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label>Age Group</label>
                <select
                  name="ageGroup"
                  value={newContent.ageGroup}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="1">Group 1</option>
                  <option value="2">Group 2</option>
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
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.mp3,.mp4" // or whatever types you want
                  onChange={handleFileChange}
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
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contents;
