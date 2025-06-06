import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";
import "./Audios.css";

const Audios = () => {
  const { user } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [likes, setLikes] = useState({});
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();
  const { audioId } = useParams();

  const [audioRefs, setAudioRefs] = useState({});

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

        const audioItems = response.data.filter(
          (item) => item.type === "audio"
        );

        const ratedAudios = await Promise.all(
          audioItems.map(async (item) => {
            const audioUrl = `http://localhost:3000${item.filePath}`;

            let thumbnailUrl = "/images/video-placeholder.png";
            if (item.thumbnail) {
              thumbnailUrl = item.thumbnail.startsWith("http")
                ? item.thumbnail
                : `http://localhost:3000${item.thumbnail}`;
            }

            try {
              const ratingRes = await axios.get(
                `http://localhost:3000/api/child/content/rating/${item.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );

              return {
                ...item,
                audio: audioUrl,
                thumbnail: thumbnailUrl,
                artist: item.artist || "Unknown Artist",
                duration: item.duration || "Unknown",
                rating: ratingRes.data.averageRating || 0,
              };
            } catch (err) {
              console.error(
                `Failed to fetch rating for audio ${item.id}:`,
                err
              );
              return {
                ...item,
                audio: audioUrl,
                thumbnail: thumbnailUrl,
                artist: item.artist || "Unknown Artist",
                duration: item.duration || "Unknown",
                rating: 0,
              };
            }
          })
        );

        setSongs(ratedAudios);

        const initialRatings = {};
        ratedAudios.forEach((song) => {
          initialRatings[song.id] = song.rating;
        });
        setRatings(initialRatings);

        const refs = {};
        ratedAudios.forEach((song) => {
          refs[song.id] = new Audio(song.audio);
        });
        setAudioRefs(refs);
      } catch (error) {
        console.error("Failed to fetch audios:", error);
      }
    };

    fetchAudios();
  }, [user.token]);

  const handlePlayPause = (songId) => {
    const currentAudio = audioRefs[songId];
    if (!currentAudio) return;

    if (playingId === songId) {
      currentAudio.pause();
      setPlayingId(null);
    } else {
      if (playingId && audioRefs[playingId]) {
        audioRefs[playingId].pause();
      }
      currentAudio.play();
      setPlayingId(songId);
    }
  };

  const handleForward = (songId) => {
    const audio = audioRefs[songId];
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  };

  const handleBackward = (songId) => {
    const audio = audioRefs[songId];
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const handleLike = (songId) => {
    setLikes((prev) => ({ ...prev, [songId]: !prev[songId] }));
  };

  return (
    <div className="child-content">
      <h3 className="section-title">Recommended Audio for your Age group</h3>
      <div className="audio-grid">
        {songs.map((song) => (
          <div
            key={song.id}
            className="audio-card"
            onClick={() => navigate(`/child/audios/${song.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="song-thumbnail-container">
              <img
                src={song.thumbnail}
                alt={song.title}
                className="audio-thumbnail"
                onError={(e) => {
                  e.target.src = "/images/video-placeholder.png";
                }}
              />
              <div className="audio-duration">{song.duration}</div>
            </div>
            <div className="audio-details">
              <h4 className="audio-title">{song.title}</h4>
              <p className="audio-artist">{song.artist}</p>
              <div className="audio-controls">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBackward(song.id);
                  }}
                >
                  ◀ 10s
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(song.id);
                  }}
                >
                  {playingId === song.id ? "⏸ Pause" : "▶ Play"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleForward(song.id);
                  }}
                >
                  10s ▶
                </button>
              </div>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= (song.rating || 0) ? "filled" : ""}
                  >
                    {star <= (song.rating || 0) ? "⭐" : "☆"}
                  </span>
                ))}
                <span className="rating-value">
                  ({(song.rating || 0).toFixed(1)})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Audios;
