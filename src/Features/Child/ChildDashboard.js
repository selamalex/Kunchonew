// ChildDashboard.js
import { useContext, useState, useNavigate} from "react";
import { Link } from "react-router-dom";
import Abush from "../../Assets/images/Abush.png";
import Bitiko from "../../Assets/images/Bitiko.png";
import Mitu from "../../Assets/images/Mitu.png";
import book from "../../Assets/images/bookft.png";
import catf from "../../Assets/images/catface.jpg";
import dog from "../../Assets/images/dog.png";
import game from "../../Assets/images/game.jpg";
import hen from "../../Assets/images/hen.png";
import music from "../../Assets/images/musicbg.png";
import video from "../../Assets/images/videosbg.png";
import LogoutButton from "../../Components/LogoutButton";
import Navbar from "../../Components/Navbar";
import { AuthContext } from "../../Context/AuthContext";
import "./ChildDashboard.css";

const ChildDashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const navigate = useNavigate();

  const toggleSidebar = () => {
    console.log("clicked");
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger Menu */}
      <div className="hamburgerchild" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen? 'active' : ''}`}>
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
        <LogoutButton  />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Navbar pageName="Dashboard" />

        <h1>Hello, {user.firstName}</h1>
        <p>Explore fun videos, exciting books, cool music, and awesome games.</p>

        <h2>Our Characters</h2>
       <div className="character-container">
  {[
    { img: Abush, name: "Abush" },
    { img: Bitiko, name: "Bitiko" },
    { img: Mitu, name: "Mitu" },
    { img: hen, name: "Kuku" },
    { img: dog, name: "Buch" },
    { img: catf, name: "Wero" },
  ].map((char, idx) => (
    <div className="character" key={idx}>
      <img src={char.img} alt={char.name} />
      <p>{char.name}</p>
    </div>
  ))}
</div>


        <div className="recentsample">
          <div className="section-header">
            <h2>Contents Available for you</h2>
          </div>
          <div className="video-container-main">
            <Link to="/child/audios" className="video-container">
              <div className="image-container">
                <img src={music} alt="Audios" />
              </div>
              <p>Audios</p>
            </Link>

            <Link to="/child/videos" className="video-container">
              <div className="image-container">
                <img src={video} alt="Videos" />
              </div>
              <p>Videos</p>
            </Link>

            <Link to="/child/books" className="video-container">
              <div className="image-container">
                <img src={book} alt="Books" />
              </div>
              <p>Books</p>
            </Link>

            <Link to="/child/games" className="video-container">
              <div className="image-container">
                <img src={game} alt="Games" />
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