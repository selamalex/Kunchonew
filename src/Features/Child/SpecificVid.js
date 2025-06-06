import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SpacificVid.css";
import { AuthContext } from "../../Context/AuthContext";
import Header from "../../Components/Header";

const SpecificVid = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/child/content/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setVideo(response.data);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };

    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/child/content/rating/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data.myRating) {
          setUserRating(response.data.myRating.rating);
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      }
    };

    fetchVideo();
    fetchRating();
  }, [id]);

  const recordView = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/child/content/views/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("View recorded!");
    } catch (error) {
      console.error("Failed to record view:", error);
    }
  };
  const togglePlay = () => {
    if (!hasViewed) {
      recordView();
      setHasViewed(true);
    }

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleRating = async (rating) => {
    try {
      setUserRating(rating);

      await axios.post(
        "http://localhost:3000/api/child/content/rating",
        {
          contentId: id,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(`Successfully rated video ${id} with ${rating} stars`);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  if (!video) {
    return <div className="specific-vid-container">Loading video...</div>;
  }

  return (
    <div className="specific-vid-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="arrow">⬅️</span> Back to Videos
      </button>

      <div className="video-player-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={`http://localhost:3000${video.filePath}`}
            poster="/images/video-placeholder.png"
            onTimeUpdate={handleProgress}
            onClick={togglePlay}
            className="cute-video-player"
            controls
          />

          <div className="video-controls">
            <button className="control-button" onClick={togglePlay}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="progress-bar"
            />

            <span className="time-display">
              {formatTime(videoRef.current?.currentTime || 0)} / --:--
            </span>
          </div>
        </div>

        <div className="video-info">
          <h2 className="video-title">{video.title}</h2>

          <div className="video-meta">
            <span className="age-group">👶 Age Group: {video.ageGroup}+</span>
            <span className="separator">•</span>
            <span className="date">
              📅 Uploaded on {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="video-description">
            {video.description || "No description provided."}
          </p>

          <div className="rating-section">
            <h3>How much do you love this video?</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    star <= (hoverRating || userRating) ? "filled" : ""
                  }`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {star <= (hoverRating || userRating) ? "🌟" : "⭐"}
                </span>
              ))}
            </div>
            <p className="rating-feedback">
              {userRating > 0
                ? `You rated this ${userRating} star${
                    userRating > 1 ? "s" : ""
                  }! 💖`
                : "Rate this?"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default SpecificVid;
