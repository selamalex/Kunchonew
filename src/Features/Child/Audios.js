import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import "./Audios.css";

const Audios = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [ratings, setRatings] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/child/content"
        );
        const audioItems = response.data.filter(
          (item) => item.type === "audio"
        );
        setSongs(audioItems);
      } catch (error) {
        console.error("Failed to fetch audios:", error);
      }
    };

    fetchAudios();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", nextSong);
      return () => audio.removeEventListener("ended", nextSong);
    }
  }, [songs]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (!songs.length) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const updateProgress = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleRating = (songId, rating) => {
    setRatings({ ...ratings, [songId]: rating });
  };

  const handleLike = (songId) => {
    setLikes({ ...likes, [songId]: !likes[songId] });
  };

  const currentSong = songs[currentSongIndex] || {};

  return (
    <div className="audio-container">
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li>
            <Link to="/child/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/child/videos">Videos</Link>
          </li>
          <li>
            <Link to="/child/books">Books</Link>
          </li>
          <li className="active">Audio</li>
          <li>
            <Link to="/child/games">Games</Link>
          </li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      <div className="main-content">
        <Navbar pageName="Audio Player" />

        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {songs.length > 0 && (
          <div className="player-container">
            <div className="player-cover">
              <img src={currentSong.cover} alt="Album Cover" />
            </div>

            <div className="player-info">
              <h2>{currentSong.title}</h2>
              <p>{currentSong.artist}</p>

              <button
                className={`like-button ${
                  likes[currentSong.id] ? "liked" : ""
                }`}
                onClick={() => handleLike(currentSong.id)}
              >
                {likes[currentSong.id] ? "❤️ Liked" : "🤍 Like"}
              </button>

              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(currentSong.id, star)}
                    className={
                      star <= (ratings[currentSong.id] || 0) ? "filled" : ""
                    }
                  >
                    {star <= (ratings[currentSong.id] || 0) ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
            </div>

            <div className="progress-container">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="progress-bar"
              />
              <span className="time">
                {formatTime(audioRef.current?.currentTime || 0)} /{" "}
                {currentSong.duration}
              </span>
            </div>

            <div className="controls">
              <button className="control-button" onClick={prevSong}>
                ⏮
              </button>
              <button className="play-button" onClick={togglePlay}>
                {isPlaying ? "⏸" : "▶️"}
              </button>
              <button className="control-button" onClick={nextSong}>
                ⏭
              </button>
            </div>

            <div className="volume-control">
              <span>🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span>🔊</span>
            </div>

            <audio
              ref={audioRef}
              src={currentSong.audio}
              onTimeUpdate={updateProgress}
            />
          </div>
        )}

        <div className="song-list">
          <h3>More Songs</h3>
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`song-item ${
                index === currentSongIndex ? "active" : ""
              }`}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
            >
              <img src={song.cover} alt={song.title} />
              <div className="song-details">
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
              <div className="song-actions">
                <button
                  className={`mini-like ${likes[song.id] ? "liked" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(song.id);
                  }}
                >
                  {likes[song.id] ? "❤️" : "🤍"}
                </button>
                <span className="rating">{ratings[song.id] || 0}/5</span>
              </div>
            </div>
          ))}
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

export default Audios;
