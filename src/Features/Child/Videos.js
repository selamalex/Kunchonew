import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar'; // Import the Navbar component
import '../Child/Videos.css';

const Videos = () => {
  // Mock data
  const videos = [
    { id: 1, title: 'ቀይዋ ወፍ', views: '40', duration: '4:34', thumbnail: 'images/Abush.png' },
    { id: 2, title: 'እንቡፍ እንቡፍእንቡፍ', views: '85', duration: '24:12', thumbnail: 'images/Abush.png' },
    { id: 3, title: 'እቴ እሜቴእሜቴ', views: '54', duration: '5:45', thumbnail: 'images/Bitiko.png' },
    { id: 4, title: 'መሃረቤን ያያችሁ እንዴት እንጫወት', views: '32', duration: '32:10', thumbnail: 'images/Abush.png' },
    { id: 5, title: 'ኢትዮጲያን እንወቅ', views: '21', duration: '5:22', thumbnail: 'images/Abush.png' },
    { id: 6, title: 'አኳኩሉ', views: '87', duration: '2:37', thumbnail: 'images/Abush.png' },
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/child/dashboard">Dashboard</Link></li>
          <li>Videos</li>
          <li><Link to="/child/books">Books</Link></li>
          <li><Link to="/child/audio">Audio</Link></li>
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
              <h3>ጨረቃ ድንቡል ዶቃ</h3>
              <div className="video-meta">
                <span>50 views</span>
                <span className="separator">•</span>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <h3 className="section-title">Recommended Videos</h3>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="thumbnail-container">
                <Link to={`/child/videos/${video.id}`}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
