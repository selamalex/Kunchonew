import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import anim from "../../Assets/images/lion.png";
import bg from "../../Assets/images/trendinganim.jpg";
import "./Games.css";

const Games = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});

  const games = [
    {
      id: 5, // Match backend contentId
      title: "Animal Edition",
      image: anim,
      route: "/child/games/animal",
    },
    {
      id: 6, // Example IDs — update to match real backend content IDs
      title: "Vegetable Edition",
      image: anim,
      route: "/child/games/vegetable",
    },
    {
      id: 7,
      title: "Objects Edition",
      image: anim,
      route: "/child/games/object",
    },
  ];

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="rating-display">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${
              i < fullStars
                ? "filled"
                : i === fullStars && hasHalfStar
                ? "half"
                : ""
            }`}
          >
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const token = localStorage.getItem("token"); // or from context if available
      const newRatings = {};

      for (let game of games) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/child/content/rating/${game.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          newRatings[game.id] = {
            averageRating: res.data.averageRating || 0,
            totalRatings: res.data.totalRatings || 0,
          };
        } catch (err) {
          console.error(`Error fetching rating for content ${game.id}:`, err);
        }
      }

      setRatings(newRatings);
    };

    fetchRatings();
  }, []);

  return (
    <div className="child-content">
      {/* Trending Game (hardcoded or dynamic later) */}
      <div
        className="trending-game"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), url(${bg})`,
        }}
      >
        <div className="trending-content">
          <h2 className="game-name">Trending Game: Animal Edition</h2>

          <button
            className="play-now"
            onClick={() => navigate("/child/games/animal")}
          >
            Play Now
          </button>
        </div>
      </div>

      {/* Other Games */}
      <h2 className="others-title">Other Fun Games</h2>
      <div className="games-carousel">
        {games.map((game) => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => navigate(game.route)}
          >
            <img src={game.image} alt={game.title} className="game-img" />
            <div className="game-info">
              <h3>{game.title}</h3>
              {renderStars(ratings[game.id]?.averageRating || 0)}
              <p className="plays">
                {ratings[game.id]?.totalRatings || "—"} plays
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
