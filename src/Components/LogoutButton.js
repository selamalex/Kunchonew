import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function LogoutButton() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}
