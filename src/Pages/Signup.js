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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear field-specific errors as user types
    if (e.target.name === "email") setEmailError("");
    if (e.target.name === "password") setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    const { email, password } = formData;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
      );
      return;
    }

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
       
      </div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
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
            className={`input-field ${emailError ? "error" : ""}`}
            required
          />
          {emailError && <p className="error-msg">{emailError}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field ${passwordError ? "error" : ""}`}
            required
          />
          {passwordError && <p className="error-msg">{passwordError}</p>}

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
