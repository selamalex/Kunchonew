import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // reuse same CSS as Login

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3000/api/parents", formData);
      navigate("/login"); // Redirect to login after signup
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Welcome to Our Platform!</h2>
        <p>Create your account and start exploring with your child.</p>
      </div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Parent Sign Up</h3>
          {error && <p className="error-msg">{error}</p>}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/" style={{ color: "#d59c38", textDecoration: "none" }}>
              ← Go to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
