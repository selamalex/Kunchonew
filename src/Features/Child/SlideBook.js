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

  const intervalRef = useRef(null);
  const totalTimeRef = useRef(0);
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    const checkScreenTime = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/parent/childs/screen-time/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const { dailyLimitMinutes, currentUsageMinutes, enforcedAt } = res.data;
        const isLocked =
          enforcedAt ||
          (dailyLimitMinutes > 0 && currentUsageMinutes >= dailyLimitMinutes);

        if (isLocked) {
          navigate("/child/locked");
        }
      } catch (err) {
        console.error("Failed to check screen time:", err);
      }
    };

    checkScreenTime();
  }, [user.id, user.token, navigate]);

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
  }, [bookId, user.token]);

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastTickRef.current) / 1000);
      totalTimeRef.current += elapsed;
      lastTickRef.current = now;

      try {
        await axios.post(
          "http://localhost:3000/api/parent/childs/screen-time/record",
          { duration: elapsed },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const res = await axios.get(
          `http://localhost:3000/api/parent/childs/screen-time/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const { dailyLimitMinutes, currentUsageMinutes, enforcedAt } = res.data;
        const isLocked =
          enforcedAt ||
          (dailyLimitMinutes > 0 && currentUsageMinutes >= dailyLimitMinutes);

        if (isLocked) {
          clearInterval(intervalRef.current);
          navigate("/child/locked");
        }
      } catch (err) {
        console.error("Screen time tracking failed:", err);
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(intervalRef.current);
  }, [user.id, user.token, navigate]);

  useEffect(() => {
    return () => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastTickRef.current) / 1000);
      totalTimeRef.current += elapsed;

      const totalSeconds = totalTimeRef.current;

      if (totalSeconds > 5) {
        axios
          .post(
            "http://localhost:3000/api/parent/childs/screen-time/record",
            { duration: totalSeconds },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .catch((err) =>
            console.error("Failed to save final screen time", err)
          );
      }
    };
  }, [user.id, user.token]);

  return (
    <div className="slide-book-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅️ Back to Books
      </button>

      {pages.length > 0 && (
        <>
          <img
            src={pages[currentIndex]}
            alt={`Page ${currentIndex + 1}`}
            className="page-image"
          />
          <div className="page-controls">
            <button onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}>
              Previous
            </button>
            <span>
              Page {currentIndex + 1} / {pages.length}
            </span>
            <button
              onClick={() =>
                setCurrentIndex((i) => Math.min(i + 1, pages.length - 1))
              }
            >
              Next
            </button>
          </div>
        </>
      )}

      {book && (
        <div className="book-details">
          <h2>{book.title}</h2>
          <p>{book.description || "No description provided."}</p>
          <div className="rating">
            <h3>Rate this book:</h3>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: star <= (hoverRating || rating) ? "gold" : "lightgray",
                }}
              >
                {star <= (hoverRating || rating) ? "🌟" : "⭐"}
              </span>
            ))}
            <p>{rating > 0 && `You rated this ${rating} star(s)!`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideBook;
