import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = decodeURIComponent(searchParams.get("token") || "");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/parents/reset-password",
        {
          token,
          email,
          newPassword: password,
        }
      );

      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h3>Reset Your Password</h3>
        {error && <p className="error-msg">{error}</p>}
        {success && (
          <p className="success-msg">
            {success} <Link to="/login">Go to Login</Link>
          </p>
        )}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
