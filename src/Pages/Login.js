import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // changed from username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/parents/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Decode token to get user role or send user info in the response too
      const decoded = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: decoded.role,
          id: decoded.id,
          token,
        })
      );
      // Set user context
      setUser({
        role: decoded.role,
        id: decoded.id,
        token,
      });

      // Navigate by role
      if (decoded.role === "parent") {
        navigate("/parent/dashboard");
      } else if (decoded.role === "child") {
        navigate("/child/dashboard");
      } else if (decoded.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Backend response:", err.response?.data);
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Parent Sign In</h3>
          {error && <p className="error-msg">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
