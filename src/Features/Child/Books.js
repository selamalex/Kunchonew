import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

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

        const bookItems = response.data.filter((item) => item.type === "book");

        const ratedBooks = await Promise.all(
          bookItems.map(async (book) => {
            try {
              const ratingRes = await axios.get(
                `http://localhost:3000/api/child/content/rating/${book.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
              return {
                ...book,
                thumbnail: `http://localhost:3000${
                  book.thumbnail || "/default-book.jpg"
                }`,
                rating: ratingRes.data.averageRating || 0,
              };
            } catch (err) {
              console.error(`Failed to fetch rating for book ${book.id}:`, err);
              return {
                ...book,
                thumbnail: `http://localhost:3000${
                  book.thumbnail || "/default-book.jpg"
                }`,
                rating: 0,
              };
            }
          })
        );

        setBooks(ratedBooks);
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
      <h2 className="section-title">Recommended Books for your Age group</h2>
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
              <span className="rating-value">({book.rating.toFixed(1)})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
