import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // ✅ Add this
import "./Books.css";

const Books = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/child/content",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
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
  
      <div className="child-content">
         

        <section className="cards-wrapper">
          <h2 className="cards-title">Books Available</h2>
          <div className="cards-section">
            {books.map((book) => (
              <div
                key={book.id}
                className="card glassmorphic"
                onClick={() =>
                  navigate(`/child/books/${book.id}`, { state: { book } })
                }
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
  
  );
};

export default Books;
