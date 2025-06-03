import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import LogoutButton from "../../Components/LogoutButton";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    console.log("clicked");
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ width: "200px", background: "#eee", padding: "20px" }}>
      <div className="hamburgerchild" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
         <div className="sidebar">
                <div className="logo">Kuncho</div>
                <ul>
                  <li>
                    <Link to="/child/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/child/videos">Videos</Link>
                  </li>
                  <li>
                    <Link to="/child/books">Books</Link>
                  </li>
                  <li className="active">Audio</li>
                  <li>
                    <Link to="/child/games">Games</Link>
                  </li>
                </ul>
                <LogoutButton className="logout-button" />
              </div>
      </div>
    </div>
  );
};

export default Sidebar;
