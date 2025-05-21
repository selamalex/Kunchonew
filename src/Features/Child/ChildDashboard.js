import { Link } from 'react-router-dom';
import Abush from '../../Assets/images/Abush.png';
import Bitiko from '../../Assets/images/Bitiko.png';
import Mitu from '../../Assets/images/Mitu.png';
import Navbar from '../../Components/Navbar'; // Import the Navbar component
import './ChildDashboard.css'; // Optional for styling
// import './ChildDshboard.css'; // Optional for styling

const ChildDashboard = () => {
  return (
    
    <div className="dashboard-container">

      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li>Dashboard</li>
          <li><Link to="/child/videos">Videos</Link></li>
          <li><Link to="/child/books">Books</Link></li>
          <li><Link to="/child/audio">Audio</Link></li>
          <li><Link to="/child/games">Games</Link></li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>
      
      <div className="main-content">
      {/* <nav className="navbar">
      <div className="navbar-left">
        <div className="menu-icon">☰</div>
        <h1 className="title">Dashboard</h1>
      </div>
      <div className="navbar-right">
        <input type="text" className="search-input" placeholder="Search..." />
        <span className="search-icon">🔍</span>
        <div className="profile">
          <span className="username">Ruhama Belay</span>
          <div className="profile-icon">👤</div>
        </div>
      </div>
    </nav> */}
     <Navbar pageName="Dashboard" />

        <h1>Hello, Ruhama</h1>
        <p>Explore fun videos, exciting books, cool music, and awesome games.</p>

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
        <h2>Videos</h2>
        <div className="video-container-main">
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        </div>


        <h2>Games</h2>
        <div className="video-container-main">
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        </div>

        <h2>Books</h2>
        <div className="video-container-main">
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        </div>

        <h2>Audio</h2>
        <div className="video-container-main">
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        <div className="video-container">
        <img src={Mitu} alt="Mitu" />
        <p>ቀዩ ወፍ</p>
          <button>play</button>
         
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;