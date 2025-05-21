import { Link, useNavigate } from 'react-router-dom';
import booksImg from "../../Assets/images/entertainment.png";
import gamesImg from "../../Assets/images/games.png";
import Navbar from '../../Components/Navbar'; // Import the Navbar component
// import "../../Components/CardsSection.css"; // Import the CSS file for cards
import './Books.css'; // Make sure to create this CSS file

const mockBooks = [
  {
    id: 'book1',
    title: 'ቢጢቆ እና ድመቷ',
    thumbnail: gamesImg,
  },
  {
    id: 'book2',
    title: 'ባቢ እና ሳሚ',
    thumbnail: booksImg,
  },

   {
    id: 'book3',
    title: 'ኑ እንጫወት',
    thumbnail: booksImg,
  },
];

const Books = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/child/dashboard">Dashboard</Link></li>
          <li><Link to="/child/videos">Videos</Link></li>
          <li><Link to="/child/books">Books</Link></li>
          <li><Link to="/child/audio">Audio</Link></li>
          <li><Link to="/child/games">Games</Link></li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        {/* <nav className="navbar">
          <div className="navbar-left">
            <div className="menu-icon">☰</div>
            <h1 className="title">Books</h1>
          </div>
          <div className="navbar-right">
            <input type="text" className="search-input" placeholder="Search..." />
            <span className="search-icon">🔍</span>
            <div className="profile">
              <span className="username">Ruhama Belay</span>
              <div className="profile-icon">👤</div>
            </div>
          </div>
        </nav> */}

         <Navbar pageName="Dashboard" />

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
                <img src={book.thumbnail} alt={book.title} />
                <h3>{book.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Books;