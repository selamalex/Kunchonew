/* src/features/child/Games.jsx */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cat from '../../Assets/images/cat.png';
import cow from '../../Assets/images/cow.png';
import lion from '../../Assets/images/lion.png';
import './Animals.css';

const questions = [
  {
    word: 'ላም',
    display: 'ላ_',
    options: ['መ', 'ም', 'ትት'],
    correct: 'ም',
    image: cow,
  },
  {
    word: 'አንበሳ',
    display: 'አ_በሳ',
    options: ['ላ', 'ት', 'ን'],
    correct: 'ን',
    image: lion,
  },
  {
    word: 'ድመት',
    display: 'ድመ_',
    options: ['ቅ', 'ት', 'ስስ'],
    correct: 'ት',
    image: cat,
  },
];

const Animals = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [finished, setFinished] = useState(false);

  const handleOptionClick = (option) => {
    const current = questions[currentQ];

    if (option === current.correct) {
      setScore(score + 1);
      setFeedback('Correct! ✅');
      setTimeout(() => {
        goToNextQuestion();
      }, 1000);
    } else {
      if (tries === 0) {
        setTries(1);
        setFeedback('Try again ❌');
      } else {
        setFeedback(`Wrong again ❌ The correct answer was '${current.correct}'`);
        setTimeout(() => {
          goToNextQuestion();
        }, 1500);
      }
    }
  };

  const goToNextQuestion = () => {
    const next = currentQ + 1;
    if (next < questions.length) {
      setCurrentQ(next);
      setTries(0);
      setFeedback('');
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="game-container">
        <h2>Game Over 🎉</h2>
        <p>You got {score} out of {questions.length} right!</p>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="game-container" style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
      {/* Back Button */}
      <button 
        style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#431B06', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none' }} 
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      {/* Score Display */}
      <div 
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: '#431B06', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '12px', fontWeight: 'bold' }}
      >
        Score: {score}
      </div>

      <img src={q.image} alt="quiz" style={{ width: '150px', height: '150px' }} />
      <h2>Fill in the blank: {q.display}</h2>
      <div style={{ margin: '1rem' }}>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleOptionClick(opt)}
            style={{ margin: '0.5rem', padding: '1rem', fontSize: '1.5rem' }}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback && <p style={{ fontSize: '1.2rem' }}>{feedback}</p>}
    </div>
  );
};

export default Animals;
