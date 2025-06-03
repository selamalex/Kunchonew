import { Link, useNavigate } from 'react-router-dom';
import anim from '../../Assets/images/lion.png';
import bg from '../../Assets/images/trendinganim.jpg';
import './Games.css';


const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Animal Edition",
      image: anim,
      route: "/child/games/animal",
      rating: 4.5,
      plays: "1.2K",
    },
    {
      id: 2,
      title: "Vegetable Edition",
      image: anim,
      route: "/child/games/vegetable",
      rating: 4.0,
      plays: "890",
    },
    {
      id: 3,
      title: "Objects Edition",
      image: anim,
      route: "/child/games/object",
      rating: 4.2,
      plays: "1.5K",
    },
  ];

  const handleBack = () => navigate(-1);

  const renderStars = (rating) => {
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

  return (
      <div className="child-content">
        
        <div className="trending-game" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), url(${bg})` }}>
          <div className="trending-content">
            <h2 className="game-name">Trending Game: Animal Edition</h2>
            <div className="trending-rating">
              {renderStars(4.7)}{" "}
              <span className="plays-count">(2.3K plays)</span>
            </div>
            <button
              className="play-now"
              onClick={() => navigate("/child/games/animal")}
            >
              Play Now
            </button>
          </div>
        </div>

        {/* Other Games Section */}
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
                {renderStars(game.rating)}
                <p className="plays">{game.plays} plays</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      

  );
};

export default Games;
