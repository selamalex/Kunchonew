import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "../Child/Videos.css";

const Videos = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/child/content",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            params: {
              type: "video",
            },
          }
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
  }, [user.token]);

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
  
      <div className="child-content">
       
        <h3 className="section-title">Recommended Videos</h3>
        <div className="video-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() =>
                navigate(`/child/videos/${video.id}`, { state: video })
              }
            >
              <div className="thumbnail-container">
                <img
                  src={
                    video.thumbnail
                      ? `http://localhost:3000${video.thumbnail}`
                      : "/images/video-placeholder.png"
                  }
                  alt={video.title}
                  className="video-thumbnail"
                />
                <div className="video-duration">--:--</div>
              </div>
              <div className="video-details">
                <h4 className="video-title">{video.title}</h4>
                <p className="video-views">{video.ageGroup}+ age group</p>
                {renderStars(Math.random() * 2 + 3)}
              </div>
            </div>
          ))}
        </div> </div>
  );
};

export default Videos;
