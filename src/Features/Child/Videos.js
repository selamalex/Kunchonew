import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import '../Child/Videos.css';

const Videos = () => {
  // Mock data with ratings
  const videos = [
    { id: 1, title: 'ቀይዋ ወፍ', views: '40', duration: '4:34', thumbnail: 'images/Abush.png', rating: 4.2 },
    { id: 2, title: 'እንቡፍ እንቡፍእንቡፍ', views: '85', duration: '24:12', thumbnail: 'images/Abush.png', rating: 3.8 },
    { id: 3, title: 'እቴ እሜቴእሜቴ', views: '54', duration: '5:45', thumbnail: 'images/Bitiko.png', rating: 4.5 },
    { id: 4, title: 'መሃረቤን ያያችሁ እንዴት እንጫወት', views: '32', duration: '32:10', thumbnail: 'images/Abush.png', rating: 4.0 },
    { id: 5, title: 'ኢትዮጲያን እንወቅ', views: '21', duration: '5:22', thumbnail: 'images/Abush.png', rating: 3.5 },
    { id: 6, title: 'አኳኩሉ', views: '87', duration: '2:37', thumbnail: 'images/Abush.png', rating: 4.7 },
  ];

  // Star rating display component
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="video-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < fullStars ? 'filled' : (i === fullStars && hasHalfStar ? 'half' : '')}`}>
            {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '½' : '☆')}
          </span>
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar remains unchanged */}
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/child/dashboard">Dashboard</Link></li>
          <li>Videos</li>
          <li><Link to="/child/books">Books</Link></li>
          <li><Link to="/child/audios">Audio</Link></li>
          <li><Link to="/child/games">Games</Link></li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      <div className="main-content">
        <Navbar pageName="Videos" />

        <div className="featured-video">
          <div className="video-player">
            <div className="player-placeholder">Video Player</div>
            <div className="video-info">
              <h3>ጨረቃ ድንቡል �ዶቃ</h3>
              <div className="video-meta">
                <span>50 views</span>
                <span className="separator">•</span>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="section-title">Recommended Videos</h3>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="thumbnail-container">
                <Link to={`/child/videos/${video.id}`}> {/* Updated link */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <div className="video-duration">{video.duration}</div>
                </Link>
              </div>
              <div className="video-details">
                <h4 className="video-title">{video.title}</h4>
                <p className="video-views">{video.views} views</p>
                {renderStars(video.rating)} {/* Added rating display */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;