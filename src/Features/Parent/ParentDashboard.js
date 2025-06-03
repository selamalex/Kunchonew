import { useContext } from "react";
import {
  FaClock,
  FaTachometerAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import LogoutButton from "../../Components/LogoutButton";
import { AuthContext } from "../../Context/AuthContext";
import "../Parent/Parent.css"; // Import the CSS for ParentDashboard
import "./Sidebar.css";

const ParentDashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user.firstName);
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul>
          <li>
            <Link to="/parent/subaccounts">
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime">
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
      <div className="main-content">
        <h2 className="text-xl mb-4">
          {" "}
          <div className="greeting-sectionn">
            <div className="greeting-text">
              <h2>Hello {user.firstName},</h2>
              <p>Your Child activities and progress are updated here</p>
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default ParentDashboard;
