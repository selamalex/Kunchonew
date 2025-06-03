import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const categories = [
  { value: "book", label: "Books" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Videos" },
  { value: "other", label: "Others" },
];

const Contents = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("all");
  const [contents, setContents] = useState([]);
const [showEditModal, setShowEditModal] = useState(false);
const [editingContent, setEditingContent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState({
    title: "",
    category: "book",
    // status: "Draft",
    ageGroup: "1",
    date: "",
    file: null,
    thumbnail: null,
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
            category: item.type.toLowerCase(),
            ageGroup: item.ageGroup,
            // status: item.status || "Draft",
            date: new Date(item.createdAt).toISOString().split("T")[0],
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
const handleEditClick = (content) => {
  setEditingContent(content);
  setShowEditModal(true);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditingContent((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleUpdate = async (e) => {
  e.preventDefault();
  const { id, title, category, status, ageGroup, date } = editingContent;

  try {
    const response = await fetch(`http://localhost:3000/api/admin/content/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title,
        type: category,
        ageGroup,
        status,
        createdAt: date,
      }),
    });

    if (response.ok) {
      setContents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, title, category, status, ageGroup, date } : item
        )
      );
      setShowEditModal(false);
      setEditingContent(null);
    } else {
      const result = await response.json();
      alert("Update failed: " + (result.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Edit error:", error);
    alert("Error while updating content.");
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
  //changes
  const handleThumbnailChange = (e) => {
    setNewContent((prev) => ({
      ...prev,
      thumbnail: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, ageGroup, date, file, thumbnail } = newContent;

    if (!title || !date || !file || !thumbnail) {
      alert(
        "Please fill in Title, Date, upload a File, and upload a Thumbnail"
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", category);
    formData.append("description", "");
    formData.append("ageGroup", ageGroup);
    //  formData.append("status", status);
    formData.append("file", file);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await fetch("http://localhost:3000/api/admin/content", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const newId = contents.length
          ? Math.max(...contents.map((c) => c.id)) + 1
          : 1;
        setContents((prev) => [
          ...prev,
          {
            id: newId,
            title: result.title,
            category: result.type.toLowerCase(),
            ageGroup,
            // status: result.status || "Draft",
            date,
          },
        ]);
        setNewContent({
          title: "",
          category: "book",
          // status: "Draft",
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
          <div className="stat-value">{contents.length}</div>
        </div>
        {categories.map((cat) => (
          <div key={cat.value} className="stat-card">
            <div className="stat-title">{cat.label}</div>
            <div className="stat-value">
              {contents.filter((c) => c.category === cat.value).length}
            </div>
          </div>
        ))}
      </div>

      <div className="tab-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          {categories.map((cat) => (
            <div
              key={cat.value}
              className={`tab ${activeTab === cat.value ? "active" : ""}`}
              onClick={() => setActiveTab(cat.value)}
            >
              {cat.label}
            </div>
          ))}
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
              {/* <th>Status</th> */}
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents
              .filter(
                (content) =>
                  activeTab === "all" || content.category === activeTab
              )
              .map((content) => (
                <tr key={content.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{content.title}</td>
                  <td>{content.category}</td>
                  {/* <td><span className={`status-badge ${content.status.toLowerCase()}`}>{content.status}</span></td> */}
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
                       onClick={() => handleEditClick(content)}
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
          onClick={() => setShowModal(false)}
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
            <h2 style={{ color: "#000" }}>Add New Content</h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ color: "#000" }}>Title</label>
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
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

          

              <div style={{ marginBottom: "12px" }}>
                <label style={{ color: "#000" }}>Date</label>
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
                <label style={{ color: "#000" }}>Upload File</label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.mp3,.mp4,.zip"
                  onChange={handleFileChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ color: "#000" }}>Upload Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  accept=".jpg,.png"
                  onChange={handleThumbnailChange}
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
      {showEditModal && editingContent && (
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
    onClick={() => setShowEditModal(false)}
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
      <h2>Edit Content</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "12px" }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editingContent.title}
            onChange={handleEditChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Category</label>
          <select
            name="category"
            value={editingContent.category}
            onChange={handleEditChange}
            style={{ width: "100%", padding: "8px" }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Status</label>
          <select
            name="status"
            value={editingContent.status}
            onChange={handleEditChange}
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
            value={editingContent.date}
            onChange={handleEditChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "8px 12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Save
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
