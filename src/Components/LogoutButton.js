import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./LogoutButton.css";

export default function LogoutButton() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}
