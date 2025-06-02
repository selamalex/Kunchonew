import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Initialized username state
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example: Sending login credentials to the server
      // const response = await axios.post("/api/login", { username, password });
      // const userData = response.data;

      // For demonstration purposes, using mock logic based on username
      if (username.startsWith("admin")) {
        setUser({ role: "admin", username });
        navigate("/admin/overview");
      } else if (username.startsWith("child")) {
        setUser({ role: "child", username, age: parseInt(password) });
        navigate("/child/dashboard");
      } else {
        setUser({ role: "parent", username });
        navigate("/parent/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          {error && <p className="error-msg">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default Login;
