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
  const playStartRef = useRef(null);
  const totalPlayTimeRef = useRef(0);
  const intervalRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const checkScreentime = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/parent/childs/screen-time/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const { dailyLimitMinutes, currentUsageMinutes, enforcedAt } = res.data;
        const isLocked =
          enforcedAt ||
          (dailyLimitMinutes > 0 && currentUsageMinutes >= dailyLimitMinutes);

        if (isLocked) {
          navigate("/child/locked");
        }
      } catch (err) {
        console.error("Failed to check screentime:", err);
      }
    };

    checkScreentime();
  }, [user.id, user.token, navigate]);

  // Record final time on unmount
  useEffect(() => {
    return () => {
      if (playStartRef.current) {
        const elapsed = Date.now() - playStartRef.current;
        totalPlayTimeRef.current += Math.floor(elapsed / 1000);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const totalSeconds = totalPlayTimeRef.current;
      if (totalSeconds > 5) {
        axios
          .post(
            "http://localhost:3000/api/parent/childs/screen-time/record",
            { duration: totalSeconds },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          )
          .catch((err) => console.error("Failed to record screen time", err));
      }
    };
  }, [user.token]);

  // Fetch video + rating
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/child/content/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setVideo(res.data);
      } catch (err) {
        console.error("Failed to fetch video:", err);
      }
    };

    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/child/content/rating/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        if (res.data.myRating) {
          setUserRating(res.data.myRating.rating);
        }
      } catch (err) {
        console.error("Failed to fetch rating:", err);
      }
    };

    fetchVideo();
    fetchRating();
  }, [id, user.token]);

  const recordView = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/child/content/views/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } catch (err) {
      console.error("Failed to record view:", err);
    }
  };

  const togglePlay = () => {
    if (!hasViewed) {
      recordView();
      setHasViewed(true);
    }

    if (isPlaying) {
      if (playStartRef.current) {
        const elapsed = Date.now() - playStartRef.current;
        totalPlayTimeRef.current += Math.floor(elapsed / 1000);
        playStartRef.current = null;
      }
      videoRef.current.pause();
    } else {
      playStartRef.current = Date.now();
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };
  const handlePlay = () => {
    playStartRef.current = Date.now();
    setIsPlaying(true);

    // Start interval to track time every 30s
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (playStartRef.current) {
          const elapsed = Date.now() - playStartRef.current;
          const seconds = Math.floor(elapsed / 1000);
          totalPlayTimeRef.current += seconds;
          playStartRef.current = Date.now();

          if (seconds > 0) {
            axios
              .post(
                "http://localhost:3000/api/parent/childs/screen-time/record",
                { duration: seconds },
                {
                  headers: { Authorization: `Bearer ${user.token}` },
                }
              )
              .catch((err) =>
                console.error("Failed to record screen time", err)
              );
          }
        }
      }, 30000); // every 30s
    }
  };

  const handlePause = () => {
    if (playStartRef.current) {
      const elapsed = Date.now() - playStartRef.current;
      const seconds = Math.floor(elapsed / 1000);
      totalPlayTimeRef.current += seconds;
      playStartRef.current = null;

      if (seconds > 0) {
        axios
          .post(
            "http://localhost:3000/api/parent/childs/screen-time/record",
            { duration: seconds },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          )
          .catch((err) => console.error("Failed to record screen time", err));
      }
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsPlaying(false);
  };

  const handleRating = async (rating) => {
    try {
      setUserRating(rating);
      await axios.post(
        "http://localhost:3000/api/child/content/rating",
        { contentId: id, rating },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } catch (err) {
      console.error("Failed to rate:", err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!video)
    return <div className="specific-vid-container">Loading video...</div>;

  return (
    <div className="specific-vid-container">
      <Header />

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
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handlePause}
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

export default SpecificVid;
