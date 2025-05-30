import React, { useState } from "react";
import ChildCard from "./ChildCard";
import { FaEllipsisH, FaPlus, FaTimes } from "react-icons/fa";
import "./ChildAccounts.css";

const childrenData = [
  { name: "Mimi", age: 6 },
  { name: "Lulu", age: 7 },
];

const ChildAccounts = () => {
  const [children, setChildren] = useState(childrenData);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new child to the list
    setChildren([...children, formData]);
    // Reset form
    setFormData({
      name: "",
      age: "",
    });
    // Close modal
    setShowModal(false);
    // Show success alert
    alert("Child registered successfully!");
  };

  return (
    <div className="child-accounts-section">
      <h3 className="section-title">Children's Account</h3>
      <div className="card-container">
        {children.map((child, index) => (
          <ChildCard key={index} {...child} />
        ))}
        <div
          className="child-card add-card"
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: "#f5a12b20", borderColor: "#f5a12b" }}
        >
          <FaPlus className="add-icon" style={{ color: "#f5a12b" }} />
          <p style={{ color: "#f5a12b" }}>Add Child</p>
        </div>
      </div>
      <div className="more-icon">
        <FaEllipsisH />
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
              style={{ color: "#f5a12b" }}
            >
              <FaTimes />
            </button>
            <h2 style={{ color: "#f5a12b" }}>Add New Child</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Child's Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
