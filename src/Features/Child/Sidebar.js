import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/logokuncho.png";
import LogoutButton from "../../Components/LogoutButton";
import "./Sidebar.css";

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
      
                <div className="logo"><img src={logo}/></div>
                <ul>
                  <li onClick={() => setSidebarOpen(false)}>
                    <Link to="/child/dashboard">Dashboard</Link>
                  </li>
                  <li onClick={() => setSidebarOpen(false)}>
                    <Link to="/child/videos">Videos</Link>
                  </li>
                  <li onClick={() => setSidebarOpen(false)}>
                    <Link to="/child/books">Books</Link>
                  </li>
                  <li onClick={() => setSidebarOpen(false)}>
                    <Link to="/child/audios">Audios</Link>
                  </li>
                  <li onClick={() => setSidebarOpen(false)}>
                    <Link to="/child/games">Games</Link>
                  </li>
                </ul>
                <LogoutButton className="logout-button" />
             
      </div>
    </div>
  );
};

export default Sidebar;
