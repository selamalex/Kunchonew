import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LockScreen from "./LockScreen";
import { AuthContext } from "../../Context/AuthContext";

// assets and styles...
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
import "./ChildDashboard.css";

const ChildDashboard = () => {
  const { user } = useContext(AuthContext);
  const [enforced, setEnforced] = useState(false);

  useEffect(() => {
    const checkScreenTime = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/parent/childs/screen-time/status",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (res.data.enforcedAt) {
          setEnforced(true);
        }
      } catch (error) {
        console.error("Error checking screen time", error);
      }
    };

    checkScreenTime();

    const interval = setInterval(checkScreenTime, 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  if (enforced) {
    return <LockScreen />;
  }

  return (
    <div className="child-content">
      <h1>Hello, {user.firstName}</h1>
      <p className="additionaltext">
        Explore fun videos, exciting books, cool music, and awesome games.
      </p>

      <h2>Our Characters</h2>
      <div className="character-container">
        {[Abush, Bitiko, Mitu, hen, dog, catf].map((img, idx) => (
          <div className="character" key={idx}>
            <img src={img} alt={`char-${idx}`} />
            <p>{["Abush", "Bitiko", "Mitu", "Kuku", "Buch", "Wero"][idx]}</p>
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
  );
};

export default ChildDashboard;
