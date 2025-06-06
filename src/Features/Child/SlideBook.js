import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import "./SlideBook.css";
import { AuthContext } from "../../Context/AuthContext";

const SlideBook = () => {
  const { user } = useContext(AuthContext);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [book, setBook] = useState(null);

  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/child/content/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setBook(res.data);

        const fullPdfUrl = `http://localhost:3000${res.data.filePath}`;
        const pdf = await getDocument(fullPdfUrl).promise;

        const renderedPages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          renderedPages.push(canvas.toDataURL());
        }

        setPages(renderedPages);
      } catch (error) {
        console.error("Error loading book:", error);
        alert("Failed to load book. Check console for details.");
      }
    };

    fetchBook();

    return () => {
      const endTime = Date.now();
      const durationInSeconds = Math.floor(
        (endTime - startTimeRef.current) / 1000
      );

      axios
        .post(
          "http://localhost:3000/api/child/screentime",
          {
            childId: user.id,
            screenTime: durationInSeconds,
            contentType: "book",
            contentId: bookId,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .catch((err) => {
          console.error("Failed to log screen time:", err);
        });
    };
  }, [bookId, user.token, user.id]);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/child/content/rating/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setRating(res.data.myRating?.rating || 0);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchRating();
  }, [bookId, user.token]);

  const handleRating = async (selectedRating) => {
    try {
      await axios.post(
        "http://localhost:3000/api/child/content/rating",
        {
          contentId: bookId,
          rating: selectedRating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setRating(selectedRating);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === pages.length - 1 ? 0 : prev + 1));

  if (!book || pages.length === 0) {
    return <div className="loader">Loading book...</div>;
  }

  return (
    <div className="slidebook-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Books
      </button>

      <div className="slider-wrapper">
        <button className="nav-arrow left" onClick={prevSlide}>
          ⬅
        </button>

        <div className="slidebook-image-wrapper">
          <img
            src={pages[currentIndex]}
            alt={`Page ${currentIndex + 1}`}
            className="slidebook-image"
          />
          <div className="page-indicator">
            Page {currentIndex + 1} of {pages.length}
          </div>
        </div>

        <button className="nav-arrow right" onClick={nextSlide}>
          ➡
        </button>
      </div>
      <div className="rating-container">
        <p>Rate this book:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${
                star <= (hoverRating || rating) ? "filled" : ""
              }`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              {star <= (hoverRating || rating) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <p className="rating-text">
          {rating > 0
            ? `You rated this ${rating} star${rating > 1 ? "s" : ""}`
            : "Not rated yet"}
        </p>
      </div>
    </div>
  );
};

export default SlideBook;
