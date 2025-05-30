import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import './Audios.css';

const Audios = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [ratings, setRatings] = useState({});
  const [likes, setLikes] = useState({});

  // Kid-friendly audio tracks (using free-to-use children's songs)
  const songs = [
    {
      id: 1,
      title: "The Wheels on the Bus",
      artist: "Kids Fun",
      cover: "https://i.ytimg.com/vi/nw0UkY6-bL4/maxresdefault.jpg",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "2:45"
    },
    {
      id: 2,
      title: "Baby Shark Dance",
      artist: "Pinkfong",
      cover: "https://i.ytimg.com/vi/XqZsoesa55w/maxresdefault.jpg",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "1:30"
    },
    {
      id: 3,
      title: "ABC Song",
      artist: "Super Simple Songs",
      cover: "https://i.ytimg.com/vi/zaD84DTGULo/maxresdefault.jpg",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: "2:00"
    },
    {
      id: 4,
      title: "If You're Happy",
      artist: "Kids Fun",
      cover: "https://i.ytimg.com/vi/l4WNrvVjiTw/maxresdefault.jpg",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration: "1:45"
    }
  ];

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle next song
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);
  };

  // Handle previous song
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  // Handle progress update
  const updateProgress = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  // Handle seek
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Handle rating
  const handleRating = (songId, rating) => {
    setRatings({...ratings, [songId]: rating});
  };

  // Handle like
  const handleLike = (songId) => {
    setLikes({...likes, [songId]: !likes[songId]});
  };

  // Auto-play next song when current ends
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', nextSong);
    return () => {
      audio.removeEventListener('ended', nextSong);
    };
  }, []);

  // Auto-play when song changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="audio-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/child/dashboard">Dashboard</Link></li>
          <li><Link to="/child/videos">Videos</Link></li>
          <li><Link to="/child/books">Books</Link></li>
          <li className="active">Audio</li>
          <li><Link to="/child/games">Games</Link></li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Navbar pageName="Audio Player" />

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Audio Player Section */}
        <div className="player-container">
          <div className="player-cover">
            <img src={songs[currentSongIndex].cover} alt="Album Cover" />
          </div>

          <div className="player-info">
            <h2>{songs[currentSongIndex].title}</h2>
            <p>{songs[currentSongIndex].artist}</p>
            
            {/* Like Button */}
            <button 
              className={`like-button ${likes[songs[currentSongIndex].id] ? 'liked' : ''}`}
              onClick={() => handleLike(songs[currentSongIndex].id)}
            >
              {likes[songs[currentSongIndex].id] ? '❤️ Liked' : '🤍 Like'}
            </button>

            {/* Rating */}
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(songs[currentSongIndex].id, star)}
                  className={star <= (ratings[songs[currentSongIndex].id] || 0) ? 'filled' : ''}
                >
                  {star <= (ratings[songs[currentSongIndex].id] || 0) ? '⭐' : '☆'}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
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
              {formatTime(audioRef.current?.currentTime || 0)} / {songs[currentSongIndex].duration}
            </span>
          </div>

          {/* Controls */}
          <div className="controls">
            <button className="control-button" onClick={prevSong}>⏮</button>
            <button className="play-button" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶️'}
            </button>
            <button className="control-button" onClick={nextSong}>⏭</button>
          </div>

          {/* Volume Control */}
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

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={songs[currentSongIndex].audio}
            onTimeUpdate={updateProgress}
          />
        </div>

        {/* Song List */}
        <div className="song-list">
          <h3>More Songs</h3>
          {songs.map((song, index) => (
            <div 
              key={song.id} 
              className={`song-item ${index === currentSongIndex ? 'active' : ''}`}
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
                  className={`mini-like ${likes[song.id] ? 'liked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(song.id);
                  }}
                >
                  {likes[song.id] ? '❤️' : '🤍'}
                </button>
                <span className="rating">
                  {ratings[song.id] || 0}/5
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default Audios;