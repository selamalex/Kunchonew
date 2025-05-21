import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "admin") {
      setUser({ role: "admin", username });
      navigate("/admin/dashboard");
    } else if (role === "child") {
      setUser({ role: "child", username });
      navigate("/child/dashboard");
    } else {
      setUser({ role: "parent", username });
      navigate("/parent/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          >
            <option value="parent">Login as Parent</option>
            <option value="admin">Login as Admin</option>
            <option value="child">Login as Child</option>
          </select>
          <input
            type="text"
            placeholder="Username or email"
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
        </form>
      </div>
    </div>
  );
};

export default Login;
