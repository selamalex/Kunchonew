import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/parents/forgot-password",
        {
          email,
        }
      );

      const res = response.data;
      console.log(res);
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Backend response:", err.response?.data);
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h3>Password Reset</h3>
          <p className="forgot-password-info">
            Provide the email address associated with your account to recover
            your password.
          </p>
          {error && <p className="error-msg">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-field ${emailError ? "error" : ""}`}
            required
          />
          {emailError && <p className="error-msg">{emailError}</p>}
          <button type="submit" className="submit-btn">
            {" "}
            Reset Password
          </button>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link
              to="/login"
              style={{ color: "#d59c38", textDecoration: "none" }}
            >
              ← Go to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
