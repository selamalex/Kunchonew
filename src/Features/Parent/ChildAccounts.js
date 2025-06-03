import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClock,
  FaPlus,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import axios from "axios";

import ChildCard from "./ChildCard";
import LogoutButton from "../../Components/LogoutButton";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../Assets/images/logo.png";

import "./Sidebar.css";
import "./ChildAccounts.css";

const ChildAccounts = () => {
  const { user } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          avatarPath: "frontend/src/Assets/images/avatar1.png",
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
      alert(error.response?.data?.error || "Failed to create child");
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
      await axios.delete(
        `http://localhost:3000/api/parent/childs/${user.id}/${childId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setChildren(children.filter((child) => child.id !== childId));
    } catch (err) {
      console.error("Failed to delete child:", err);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul>
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
        <LogoutButton />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h3 className="section-title">Children's Account</h3>
        <div className="card-container">
          {children.map((child, index) => (
            <ChildCard
              key={index}
              name={child.childUser?.firstName || "Unknown"}
              age={child.age}
              userGroup={child.userGroup}
              avatarUrl={child.avatarPath}
              screenTime={child.screentime}
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

        {/* Modal */}
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
                      required
                      min={min}
                      max={max}
                    />
                    {formErrors[name] && (
                      <p className="error-text">{formErrors[name]}</p>
                    )}
                  </div>
                ))}
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
    </div>
  );
};

export default ChildAccounts;
