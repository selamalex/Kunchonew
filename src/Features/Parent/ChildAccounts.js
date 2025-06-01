import ChildCard from "./ChildCard";
import { FaEllipsisH, FaPlus, FaTimes } from "react-icons/fa";
import "./ChildAccounts.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import defaultAvatar from "../../Assets/images/avatar1.png";
import axios from "axios";

// Import statements unchanged...

const ChildAccounts = () => {
  const { user } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    userGroup: "",
    screentime: "",
    avatarPath: "", // optional
  });

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/parent/childs`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            params: { parentId: user.id },
          }
        );
        setChildren(response.data);
      } catch (error) {
        console.error("Failed to fetch children:", error);
      }
    };

    if (user?.id && user?.token) {
      fetchChildren();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/parent/childs",
        {
          ...formData,
          parentId: user.id, // Automatically set from token context
          avatarPath: "frontend/src/Assets/images/avatar1.png", // Default avatar
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear form and close modal
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        userGroup: "",
        screentime: "",
        avatarPath: "",
      });
      setShowModal(false);

      // Refresh child list
      const refreshed = await axios.get(
        `http://localhost:3000/api/parent/childs`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: { parentId: user.id },
        }
      );
      setChildren(refreshed.data);
    } catch (error) {
      console.error("Error creating child:", error);
      alert(error.response?.data?.error || "Failed to create child");
    }
  };

  return (
    <div className="child-accounts-section">
      <h3 className="section-title">Children's Account</h3>
      <div className="card-container">
        {children.map((child, index) => (
          <ChildCard
            key={index}
            name={child.childUser?.firstName || "Unknown"}
            age={child.age}
            userGroup={child.userGroup}
          />
        ))}
        <div className="child-card add-card" onClick={() => setShowModal(true)}>
          <FaPlus className="add-icon" />
          <p>Add Child</p>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          style={{ overflowY: "auto" }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <h2>Add New Child</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="18"
                />
              </div>
              <div className="form-group">
                <label>User Group</label>
                <select
                  name="userGroup"
                  value={formData.userGroup}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Group</option>
                  <option value="1">Group 1</option>
                  <option value="2">Group 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Screentime (minutes/day)</label>
                <input
                  type="number"
                  name="screentime"
                  value={formData.screentime}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
              <button
                type="submit"
                className="register-btn"
                style={{ backgroundColor: "#f5a12b" }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildAccounts;
