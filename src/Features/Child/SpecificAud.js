import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SpacificVid.css";
import { AuthContext } from "../../Context/AuthContext";

const SpecificAudio = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const screenTimeRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/child/content/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setAudio(response.data);
      } catch (error) {
        console.error("Failed to fetch audio:", error);
      }
    };

    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/child/content/rating/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        if (response.data.myRating) {
          setUserRating(response.data.myRating.rating);
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      }
    };

    fetchAudio();
    fetchRating();

    return () => {
      if (screenTimeRef.current > 0) {
        sendScreenTime();
      }
      clearInterval(intervalRef.current);
    };
  }, [id, user.token]);

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
  }, [navigate, user.id, user.token]);

  const sendScreenTime = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/child/content/screentime`,
        {
          contentId: id,
          screenTime: screenTimeRef.current,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      await axios.post(
        `http://localhost:3000/api/parent/childs/screen-time/record`,
        {
          duration: screenTimeRef.current,
          childId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("Screen time recorded successfully");
    } catch (err) {
      console.error("Failed to record screen time:", err);
    }
  };

  const startScreenTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(async () => {
      screenTimeRef.current += 10;

      try {
        await axios.post(
          `http://localhost:3000/api/parent/childs/screen-time/record`,
          {
            duration: 10,
            childId: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

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
          if (audioRef.current) audioRef.current.pause();
          stopScreenTimer();
          navigate("/child/locked");
        }
      } catch (err) {
        console.error("Screen time check or record failed:", err);
      }
    }, 10000); // every 10 seconds
  };

  const stopScreenTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const recordView = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/child/content/views/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("Audio view recorded!");
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
      audioRef.current.pause();
      stopScreenTimer();
    } else {
      audioRef.current.play();
      startScreenTimer();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleRating = async (rating) => {
    try {
      setUserRating(rating);
      await axios.post(
        `http://localhost:3000/api/child/content/rating`,
        {
          contentId: id,
          rating: rating,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(`Successfully rated audio ${id} with ${rating} stars`);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  if (!audio) {
    return <div className="specific-vid-container">Loading audio...</div>;
  }

  const thumbnailUrl = audio.thumbnail?.startsWith("http")
    ? audio.thumbnail
    : `http://localhost:3000${audio.thumbnail}`;

  return (
    <div className="specific-vid-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="arrow">⬅️</span> Back to Audios
      </button>

      <div className="video-player-container">
        <div className="video-wrapper">
          <img
            src={thumbnailUrl}
            alt={audio.title}
            className="audio-thumbnail-large"
            onError={(e) => {
              e.target.src = "/images/video-placeholder.png";
            }}
          />

          <audio
            ref={audioRef}
            src={`http://localhost:3000${audio.filePath}`}
            onTimeUpdate={handleProgress}
            className="cute-video-player"
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
              {formatTime(audioRef.current?.currentTime || 0)} / --:--
            </span>
          </div>
        </div>

        <div className="video-info">
          <h2 className="video-title">{audio.title}</h2>

          <div className="video-meta">
            <span className="age-group">👶 Age Group: {audio.ageGroup}+</span>
            <span className="separator">•</span>
            <span className="date">
              📅 Uploaded on {new Date(audio.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="video-description">
            {audio.description || "No description provided."}
          </p>

          <div className="rating-section">
            <h3>How much do you love this audio?</h3>
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

export default SpecificAudio;
