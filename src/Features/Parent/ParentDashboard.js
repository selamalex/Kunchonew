import { useContext } from "react";
import { FaClock, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import LogoutButton from "../../Components/LogoutButton";
import { AuthContext } from "../../Context/AuthContext";
import "../Parent/Parent.css"; // Import the CSS for ParentDashboard
import "./Sidebar.css";

const ParentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <p>Your child's activities and progress are updated here.</p>
    </div>
  );
};

export default ParentDashboard;
