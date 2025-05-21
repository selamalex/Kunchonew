/* src/features/child/Games.jsx */
import { Link, useNavigate } from 'react-router-dom';
import anim from '../../Assets/images/lion.png';
import bg from '../../Assets/images/trendinganim.jpg';

import './Games.css';

const Games = () => {
  const navigate = useNavigate();

  const games = [
    { id: 1, title: 'Animal Edition', image: anim, route: '/child/games/animal' },
    { id: 2, title: 'Vegetable Edition', image: anim, route: '/child/games/vegetable' },
    { id: 3, title: 'Objects Edition', image: anim, route: '/child/games/object' },
  ];

  const handleBack = () => navigate(-1);

  return (
    <div className="games-dashboard">
      <div className="sidebar">
        <button className="back-button" onClick={handleBack}>⬅ Back</button>
            <div className="logo">Kuncho</div>
            <ul>
              <li><Link to="/child/dashboard">Dashboard</Link></li>
              <li>Videos</li>
             <li><Link to="/child/books">Books</Link></li>
          <li><Link to="/child/audio">Audio</Link></li>
          <li><Link to="/child/games">Games</Link></li>
            </ul>
            <button className="logout-button">Logout</button>
          </div>
        <div>
         <nav className="navbar">
          <div className="navbar-left">
            <div className="menu-icon">☰</div>
            <h1 className="title">Games</h1>
          </div>
          <div className="navbar-right">
            <input type="text" className="search-input" placeholder="Search..." />
            <span className="search-icon">🔍</span>
            <div className="profile">
              <span className="username">Ruhama Belay</span>
              <div className="profile-icon">👤</div>
            </div>
          </div>
        </nav>
     </div>
      {/* Trending Game Section */}
      <div className="trending-game" style={{ backgroundImage: `url(${bg})` }}>
        <div className="trending-content">
          <h2 className="game-name">Trending Game: Animal Edition</h2>
          <button className="play-now" onClick={() => navigate('/child/games/animal')}>Play Now</button>
        </div>
      </div>

      {/* Other Games Section */}
      <h2 className="others-title">Others</h2>
      <div className="games-carousel">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => navigate(game.route)}>
            <img src={game.image} alt={game.title} className="game-img" />
            <div className="game-info">{game.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;




// import { useState } from 'react';
// import cat from '../../Assets/images/cat.png';
// import cow from '../../Assets/images/cow.png';
// import lion from '../../Assets/images/lion.png';
// import './Games.css';

// const questions = [
//   {
//     word: 'ላም',
//     display: 'ላ_',
//     options: ['መ', 'ም', 'ትት'],
//     correct: 'ም',
//     image: cow,
//   },
//   {
//     word: 'አንበሳ',
//     display: 'አ_በሳ',
//     options: ['ላ', 'ት', 'ን'],
//     correct: 'ን',
//     image: lion,
//   },
//   {
//     word: 'ድመት',
//     display: 'ድመ_',
//     options: ['ቅ', 'ት', 'ስስ'],
//     correct: 'ት',
//     image: cat,
//   },
// ];

// const Games = () => {
//   const [currentQ, setCurrentQ] = useState(0);
//   const [tries, setTries] = useState(0);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [finished, setFinished] = useState(false);

//   const handleOptionClick = (option) => {
//     const current = questions[currentQ];

//     if (option === current.correct) {
//       setScore(score + 1);
//       setFeedback('Correct! ✅');
//       setTimeout(() => {
//         goToNextQuestion();
//       }, 1000);
//     } else {
//       if (tries === 0) {
//         setTries(1);
//         setFeedback('Try again ❌');
//       } else {
//         setFeedback(`Wrong again ❌ The correct answer was '${current.correct}'`);
//         setTimeout(() => {
//           goToNextQuestion();
//         }, 1500);
//       }
//     }
//   };

//   const goToNextQuestion = () => {
//     const next = currentQ + 1;
//     if (next < questions.length) {
//       setCurrentQ(next);
//       setTries(0);
//       setFeedback('');
//     } else {
//       setFinished(true);
//     }
//   };

//   if (finished) {
//     return (
//       <div className="game-container">
//         <h2>Game Over 🎉</h2>
//         <p>You got {score} out of {questions.length} right!</p>
//       </div>
//     );
//   }

//   const q = questions[currentQ];

//   return (
//     <div className="game-container" style={{ textAlign: 'center', padding: '2rem' }}>
//       <img src={q.image} alt="quiz" style={{ width: '150px', height: '150px' }} />
//       <h2>Fill in the blank: {q.display}</h2>
//       <div style={{ margin: '1rem' }}>
//         {q.options.map((opt) => (
//           <button
//             key={opt}
//             onClick={() => handleOptionClick(opt)}
//             style={{ margin: '0.5rem', padding: '1rem', fontSize: '1.5rem' }}
//           >
//             {opt}
//           </button>
//         ))}
//       </div>
//       {feedback && <p style={{ fontSize: '1.2rem' }}>{feedback}</p>}
//     </div>
//   );
// };

// export default Games;
