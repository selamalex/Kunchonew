import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Abush from "../../Assets/images/Abush.png";
import Bitiko from "../../Assets/images/Bitiko.png";
import Mitu from "../../Assets/images/Mitu.png";
import Navbar from "../../Components/Navbar";
import LogoutButton from "../../Components/LogoutButton"; // Keep this import
import { AuthContext } from "../../Context/AuthContext";
import "./ChildDashboard.css";

const ChildDashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger Menu */}
      <div className="hamburgerchild" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="logo">Kuncho</div>
        <ul>
          <li>Dashboard</li>
          <li>
            <Link to="/child/videos">Videos</Link>
          </li>
          <li>
            <Link to="/child/books">Books</Link>
          </li>
          <li>
            <Link to="/child/audios">Audios</Link>
          </li>
          <li>
            <Link to="/child/games">Games</Link>
          </li>
        </ul>
        <LogoutButton className="logout-button" /> {/* Use LogoutButton */}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Navbar pageName="Dashboard" />

        <h1>Hello, {user.firstName}</h1>
        <p>
          Explore fun videos, exciting books, cool music, and awesome games.
        </p>

        <h2>Our Characters</h2>
        <div className="character-container">
          <div className="character">
            <img src={Abush} alt="Abush" />
            <p>Abush</p>
          </div>
          <div className="character">
            <img src={Bitiko} alt="Bitiko" />
            <p>Bitiko</p>
          </div>
          <div className="character">
            <img src={Mitu} alt="Mitu" />
            <p>Mitu</p>
          </div>
          {/* Duplicate characters can be removed if not needed */}
          <div className="character">
            <img src={Abush} alt="Abush" />
            <p>Abush</p>
          </div>
          <div className="character">
            <img src={Bitiko} alt="Bitiko" />
            <p>Bitiko</p>
          </div>
          <div className="character">
            <img src={Mitu} alt="Mitu" />
            <p>Mitu</p>
          </div>
          <div className="character">
            <img src={Bitiko} alt="Bitiko" />
            <p>Bitiko</p>
          </div>
        </div>

        <div className="recentsample">
          <div className="section-header">
            <h2>Contents Available for you</h2>
          </div>
          <div className="video-container-main">
            <Link to="/child/audios" className="video-container">
              <div className="image-container">
                <img src={Mitu} alt="Audios" />
              </div>
              <p>Audios</p>
            </Link>

            <Link to="/child/videos" className="video-container">
              <div className="image-container">
                <img src={Mitu} alt="Videos" />
              </div>
              <p>Videos</p>
            </Link>

            <Link to="/child/books" className="video-container">
              <div className="image-container">
                <img src={Mitu} alt="Books" />
              </div>
              <p>Books</p>
            </Link>

            <Link to="/child/games" className="video-container">
              <div className="image-container">
                <img src={Mitu} alt="Games" />
              </div>
              <p>Games</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
