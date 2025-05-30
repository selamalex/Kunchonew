import { Link, useNavigate } from 'react-router-dom';
import booksImg from "../../Assets/images/entertainment.png";
import gamesImg from "../../Assets/images/games.png";
import Navbar from '../../Components/Navbar';
import './Books.css';

// Mock data with ratings
const mockBooks = [
  {
    id: 'book1',
    title: 'ቢጢቆ እና ድመቷ',
    thumbnail: gamesImg,
    rating: 4.2
  },
  {
    id: 'book2',
    title: 'ባቢ እና ሳሚ',
    thumbnail: booksImg,
    rating: 3.8
  },
  {
    id: 'book3',
    title: 'ኑ እንጫወት',
    thumbnail: booksImg,
    rating: 4.5
  },
];

const Books = () => {
  const navigate = useNavigate();

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    
    return stars;
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/child/dashboard">Dashboard</Link></li>
          <li><Link to="/child/videos">Videos</Link></li>
          <li><Link to="/child/books">Books</Link></li>
          <li><Link to="/child/audios">Audio</Link></li>
          <li><Link to="/child/games">Games</Link></li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Navbar pageName="Books" />

        {/* Book Cards */}
        <section className="cards-wrapper">
          <h2 className="cards-title">Books Available</h2>
          <div className="cards-section">
            {mockBooks.map((book) => (
              <div
                key={book.id}
                className="card glassmorphic"
                onClick={() => navigate(`/child/books/${book.id}`)}
              >
                <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
                <h3>{book.title}</h3>
                <div className="book-rating">
                  {renderStars(book.rating)}
                  <span className="rating-value">({book.rating.toFixed(1)})</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Books;