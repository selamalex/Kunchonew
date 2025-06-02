import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SlideBook.css";

const SlideBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [imagePaths, setImagePaths] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const paths = [];
      for (let i = 1; i <= 10; i++) {
        const imgPath = `/books/${bookId}/${i}.jpg`;
        try {
          const res = await fetch(imgPath);
          if (res.ok) {
            paths.push(imgPath);
          } else {
            break;
          }
        } catch {
          break;
        }
      }
      setImagePaths(paths);
    };

    loadImages();
  }, [bookId]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagePaths.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imagePaths.length - 1 ? 0 : prev + 1));
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    // Here you would typically send the rating to your backend
    console.log(`Rated book ${bookId} with ${selectedRating} stars`);
  };

  if (imagePaths.length === 0) return <div className="loader">Loading book...</div>;

  return (
    <div className="slidebook-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Books
      </button>

      {/* Rating System */}
      <div className="rating-container">
        <p>Rate this book:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              {star <= (hoverRating || rating) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <p className="rating-text">
          {rating > 0 ? `You rated this ${rating} star${rating > 1 ? "s" : ""}` : "Not rated yet"}
        </p>
      </div>

      {/* Book Slides */}
      <div className="slider-wrapper">
        <button className="nav-arrow left" onClick={prevSlide}>
          ⬅
        </button>

        <div className="slidebook-image-wrapper">
          <img
            src={imagePaths[currentIndex]}
            alt={`Page ${currentIndex + 1}`}
            className="slidebook-image"
          />
          <div className="page-indicator">
            Page {currentIndex + 1} of {imagePaths.length}
          </div>
        </div>

        <button className="nav-arrow right" onClick={nextSlide}>
          ➡
        </button>
      </div>
    </div>
  );
};

export default SlideBook;