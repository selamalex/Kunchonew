import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogoutButton from "../../Components/LogoutButton";
import Navbar from "../../Components/Navbar";
import { AuthContext } from "../../Context/AuthContext";
import "./Audios.css";

const Audios = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [audioRefs, setAudioRefs] = useState({});
  const [likes, setLikes] = useState({});
  const [ratings, setRatings] = useState({});
  const { audioId } = useParams();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/child/content",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            params: { type: "audio" },
          }
        );

        const audioItems = response.data
          .filter((item) => item.type === "audio")
          .map((item) => ({
            ...item,
            audio: `http://localhost:3000${item.filePath}`,
            artist: item.artist || "Unknown Artist",
            cover: item.cover || "/default-cover.jpg",
            duration: item.duration || "Unknown",
          }));

        setSongs(audioItems);

        // Create refs for each audio
        const refs = {};
        audioItems.forEach((song) => {
          refs[song.id] = React.createRef();
        });
        setAudioRefs(refs);
      } catch (error) {
        console.error("Failed to fetch audios:", error);
      }
    };

    fetchAudios();
  }, [user.token]);

  const handlePlayPause = (songId) => {
    const audio = audioRefs[songId]?.current;
    if (!audio) return;

    if (playingId === songId) {
      audio.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing audio
      if (playingId && audioRefs[playingId]) {
        audioRefs[playingId].current.pause();
      }

      audio.play();
      setPlayingId(songId);
    }
  };
  const handleForward = (songId) => {
    const audio = audioRefs[songId]?.current;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  };
  const handleBackward = (songId) => {
    const audio = audioRefs[songId]?.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const handleLike = (songId) => {
    setLikes((prev) => ({ ...prev, [songId]: !prev[songId] }));
  };

  const handleRating = (songId, rating) => {
    setRatings((prev) => ({ ...prev, [songId]: rating }));
  };

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
        <LogoutButton className="logout-button" />
      </div>

      <div className="main-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Navbar pageName="Audio Player" />

        {songs.length > 0 && (
          <div className="player-container">
            {songs.map((song) => (
              <div
                className="player-song"
                key={song.id}
                onClick={() => navigate(`/child/audios/${song.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="player-cover clickable"
                  onClick={() => navigate(`/child/audios/${song.id}`)}
                >
                  <img src={song.cover} alt="Album Cover" />
                </div>

                <div className="player-details">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                  <div className="song-duration">{song.duration}</div>
                </div>
                <audio ref={audioRefs[song.id]} src={song.audio} />
                <button
                  className="play-button"
                  onClick={() => handlePlayPause(song.id)}
                >
                  {playingId === song.id ? "⏸ Pause" : "▶️ Play"}
                </button>
                <button
                  className="forward-button"
                  onClick={() => handleForward(song.id)}
                >
                  ⏩ Forward 10s
                </button>
                <button
                  className="backward-button"
                  onClick={() => handleBackward(song.id)}
                >
                  ⏪ Back 10s
                </button>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(song.id, star)}
                      className={
                        star <= (ratings[song.id] || 0) ? "filled" : ""
                      }
                    >
                      {star <= (ratings[song.id] || 0) ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
                <button
                  className={`like-button ${likes[song.id] ? "liked" : ""}`}
                  onClick={() => handleLike(song.id)}
                ></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Audios;
