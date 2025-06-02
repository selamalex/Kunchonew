import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { AuthContext } from "../../Context/AuthContext"; // ✅ Add this
import "./Books.css";

const Books = () => {
  const { user } = useContext(AuthContext); // ✅ Get the logged-in user
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/child/content",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // ✅ Send token
            },
            params: { type: "book" },
          }
        );

        const bookItems = response.data
          .filter((item) => item.type === "book")
          .map((item) => ({
            ...item,
            thumbnail: `http://localhost:3000${
              item.thumbnail || "/default-book.jpg"
            }`,
            rating: item.rating || 4,
          }));

        setBooks(bookItems);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [user.token]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li>
            <Link to="/child/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/child/videos">Videos</Link>
          </li>
          <li className="active">Books</li>
          <li>
            <Link to="/child/audios">Audio</Link>
          </li>
          <li>
            <Link to="/child/games">Games</Link>
          </li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>

      <div className="main-content">
        <Navbar pageName="Books" />

        <section className="cards-wrapper">
          <h2 className="cards-title">Books Available</h2>
          <div className="cards-section">
            {books.map((book) => (
              <div
                key={book.id}
                className="card glassmorphic"
                onClick={() => navigate(`/child/books/${book.id}`)}
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="book-thumbnail"
                />
                <h3>{book.title}</h3>
                <div className="book-rating">
                  {renderStars(book.rating)}{" "}
                  <span className="rating-value">
                    ({book.rating.toFixed(1)})
                  </span>
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
