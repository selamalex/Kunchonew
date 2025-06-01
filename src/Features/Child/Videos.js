import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import "../Child/Videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/child/content",
          { params: { type: "video" } }
        );
        const filteredVideos = response.data.filter(
          (item) => item.type === "video"
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="video-rating">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${
              i < fullStars
                ? "filled"
                : i === fullStars && hasHalfStar
                ? "half"
                : ""
            }`}
          >
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li>
            <Link to="/child/dashboard">Dashboard</Link>
          </li>
          <li>Videos</li>
          <li>
            <Link to="/child/books">Books</Link>
          </li>
          <li>
            <Link to="/child/audios">Audio</Link>
          </li>
          <li>
            <Link to="/child/games">Games</Link>
          </li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      <div className="main-content">
        <Navbar pageName="Videos" />

        <h3 className="section-title">Recommended Videos</h3>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="thumbnail-container">
                <a
                  href={video.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={"/images/video-placeholder.png"} // Placeholder until you have thumbnails
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <div className="video-duration">--:--</div>{" "}
                  {/* Duration unknown in API */}
                </a>
              </div>
              <div className="video-details">
                <h4 className="video-title">{video.title}</h4>
                <p className="video-views">{video.ageGroup}+ age group</p>
                {renderStars(Math.random() * 2 + 3)}{" "}
                {/* Random rating for now */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
