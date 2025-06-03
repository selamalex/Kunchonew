// ChildDashboard.js
import { useContext, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
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

import { AuthContext } from "../../Context/AuthContext";
import "./ChildDashboard.css";

const ChildDashboard = () => {
  const { user } = useContext(AuthContext);
 
  
  return (
  
      <div className="child-content">
       
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
  
  );
};

export default ChildDashboard;