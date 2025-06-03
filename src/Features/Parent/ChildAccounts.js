import ChildCard from "./ChildCard";
import { FaEllipsisH, FaPlus, FaTimes } from "react-icons/fa";
import "./ChildAccounts.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import defaultAvatar from "../../Assets/images/avatar1.png";
import axios from "axios";

const ChildAccounts = () => {
  const { user } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  const handleUpdateChild = async (updatedData) => {
    console.log("Updating child with data:", updatedData);
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
      // Refresh list
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
    } catch (err) {
      console.error("Failed to update child:", err);
    }
  };
  const handleDeleteChild = async (childId) => {
    console.log(
      "Attempting to delete child:",
      childId,
      "with parent:",
      user.id
    );
    try {
      await axios.delete(
        `http://localhost:3000/api/parent/childs/${user.id}/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setChildren(children.filter((child) => child.id !== childId));
    } catch (err) {
      console.error("Failed to delete child:", err);
    }
  };
  const validateInputs = () => {
    const errors = {};
    const { email, password, confirmPassword, age } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const ageNum = parseInt(age);

    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (isNaN(ageNum) || ageNum < 3 || ageNum > 12) {
      errors.age = "Age must be between 3 and 12.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const ageNum = parseInt(formData.age);
    const userGroup = ageNum <= 6 ? 1 : 2;

    try {
      const response = await axios.post(
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
            avatarUrl={child.avatarPath}
            onUpdate={(updatedFields) =>
              handleUpdateChild({ ...updatedFields, id: child.id })
            }
            onDelete={() => handleDeleteChild(child.id)}
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
                {formErrors.email && (
                  <p className="error-text">{formErrors.email}</p>
                )}
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
                {formErrors.password && (
                  <p className="error-text">{formErrors.password}</p>
                )}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.confirmPassword && (
                  <p className="error-text">{formErrors.confirmPassword}</p>
                )}
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="3"
                  max="12"
                />
                {formErrors.age && (
                  <p className="error-text">{formErrors.age}</p>
                )}
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
