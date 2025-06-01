import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SpacificVid.css";

const SpecificVid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: video } = useLocation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!video) {
    return <div className="specific-vid-container">Video not found.</div>;
  }

  const togglePlay = () => {
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

  const handleRating = (rating) => {
    setUserRating(rating);
    console.log(`Rated video ${id} with ${rating} stars`);
  };

  return (
    <div className="specific-vid-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="arrow">⬅️</span> Back to Videos
      </button>

      <div className="video-player-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={video.filePath} // ✅ Use dynamic path
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
            <span className="views">👀 {video.views || "1.2K"} views</span>
            <span className="separator">•</span>
            <span className="date">📅 {video.uploadDate || "N/A"}</span>
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
                ? `You gave ${userRating} star${
                    userRating > 1 ? "s" : ""
                  }! Thank you! 💖`
                : "Tap the stars to rate!"}
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
