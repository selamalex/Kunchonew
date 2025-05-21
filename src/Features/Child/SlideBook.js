import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SlideBook.css"; // You'll create this for styling

const SlideBook = () => {
  const { bookId } = useParams();
  const [imagePaths, setImagePaths] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  if (imagePaths.length === 0) return <div className="loader">Loading book...</div>;

  return (
    <div className="slidebook-container">
      <button className="nav-arrow left" onClick={prevSlide}>⬅</button>

      <div className="slidebook-image-wrapper">
        <img
          src={imagePaths[currentIndex]}
          alt={`Page ${currentIndex + 1}`}
          className="slidebook-image"
        />
      </div>

      <button className="nav-arrow right" onClick={nextSlide}>➡</button>
    </div>
  );
};

export default SlideBook;