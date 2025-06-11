import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClock,
  FaPlus,
  FaTimes,
  FaBars,
  FaTrashAlt,
} from "react-icons/fa";
import axios from "axios";

import ChildCard from "./ChildCard";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../Assets/images/logo.png";

import LogoutButton from "../../Components/LogoutButton";

import "./Sidebar.css";
import "./ChildAccounts.css";

const ChildAccounts = () => {
  const { user } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    screentime: "",
    avatarPath: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch children
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

  const validateInputs = () => {
    const errors = {};
    const { email, password, confirmPassword, age } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const ageNum = parseInt(age);

    if (!emailRegex.test(email)) errors.email = "Invalid email format.";
    if (!passwordRegex.test(password))
      errors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and a number.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (isNaN(ageNum) || ageNum < 3 || ageNum > 12)
      errors.age = "Age must be between 3 and 12.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const ageNum = parseInt(formData.age);
    const userGroup = ageNum <= 6 ? 1 : 2;

    try {
      await axios.post(
        "http://localhost:3000/api/parent/childs",
        {
          ...formData,
          userGroup,
          age: ageNum,
          parentId: user.id,
          avatarPath: "/Abush.png",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        screentime: "",
        avatarPath: "",
      });
      setFormErrors({});
      setShowModal(false);

      const refreshed = await axios.get(
        `http://localhost:3000/api/parent/childs`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { parentId: user.id },
        }
      );
      setChildren(refreshed.data);
    } catch (error) {
      console.error("Error creating child:", error);
      const errorMsg = error.response?.data?.error || "Something went wrong";
      const errors = {};

      const fieldKeywords = {
        firstName: ["first name", "firstname"],
        lastName: ["last name", "lastname"],
        email: ["email"],
        password: ["password"],
        confirmPassword: ["confirm password", "confirm"],
        age: ["age"],
        screentime: ["screentime", "screen time"],
      };

      const lowerError = errorMsg.toLowerCase();
      let matched = false;
      for (const [field, keywords] of Object.entries(fieldKeywords)) {
        for (const keyword of keywords) {
          if (lowerError.includes(keyword)) {
            errors[field] = errorMsg;
            matched = true;
            break;
          }
        }
        if (matched) break;
      }

      if (!matched) errors.general = errorMsg;

      setFormErrors(errors);
    }
  };

  const handleUpdateChild = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/parent/childs/${user.id}/${updatedData.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const refreshed = await axios.get(
        `http://localhost:3000/api/parent/childs`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { parentId: user.id },
        }
      );
      setChildren(refreshed.data);
    } catch (err) {
      console.error("Failed to update child:", err);
    }
  };

  const handleDeleteChild = async (childId) => {
    try {
      await axios.delete(`http://localhost:3000/api/parent/childs/${childId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setChildren(children.filter((child) => child.id !== childId));
    } catch (err) {
      console.error("Failed to delete child:", err);
    }
  };

  // Delete Account handler (show confirmation modal)
  const handleDeleteAccount = () => {
    // Implement your actual delete account logic here
    console.log("Account deleted");
    setShowConfirmModal(false);
  };

  return (
    <div className="dashboard-container">
      <button
        className="sidebar-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/parent/dashboard" onClick={() => setSidebarOpen(false)}>
              <FaTachometerAlt />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/parent/subaccounts"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime" onClick={() => setSidebarOpen(false)}>
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <LogoutButton />
        </div>
      </div>

      <div className="main-content">
        <div className="child-accounts-section">
          <div className="card-container">
            {children.map((child, index) => (
              <ChildCard
                key={index}
                name={child.childUser?.firstName || "Unknown"}
                age={child.age}
                userGroup={child.userGroup}
                screentime={child.screentime}
                avatarUrl={child.avatarPath}
                onUpdate={(updatedFields) =>
                  handleUpdateChild({ ...updatedFields, id: child.id })
                }
                onDelete={() => handleDeleteChild(child.id)}
              />
            ))}
            <div
              className="child-card add-card"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="add-icon" />
              <p>Add Child</p>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
              <h2>Add New Child</h2>
              <form onSubmit={handleSubmit}>
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Password", name: "password", type: "password" },
                  {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                  },
                  {
                    label: "Age",
                    name: "age",
                    type: "number",
                    min: 3,
                    max: 12,
                  },
                  {
                    label: "Screentime (minutes/day)",
                    name: "screentime",
                    type: "number",
                    min: 0,
                  },
                ].map(({ label, name, type, min, max }) => (
                  <div className="form-group" key={name}>
                    <label>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      min={min}
                      max={max}
                      required
                    />
                    {formErrors[name] && (
                      <span className="error-text">{formErrors[name]}</span>
                    )}
                  </div>
                ))}
                {formErrors.general && (
                  <div className="error-text">{formErrors.general}</div>
                )}
                <button type="submit" className="submit-btn">
                  Add Child
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Are you sure you want to delete your account?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDeleteAccount}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildAccounts;
