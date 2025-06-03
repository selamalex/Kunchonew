import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chair from "../../Assets/images/chair.png";
import table from "../../Assets/images/table.png";
import tv from "../../Assets/images/tv.png";
import "./Animals.css";

const questions = [
  {
    word: "ወንበር",
    display: "ወ_በር",
    options: ["ን", "ም", "ስ"],
    correct: "ን",
    image: chair,
  },
  {
    word: "ጠረጴዛ",
    display: "ጠረ_ዛ",
    options: ["ቤ", "ጴ", "ፔ"],
    correct: "ጴ",
    image: table,
  },
  {
    word: "ቴሌቪዥን",
    display: "_ሌቪዥን",
    options: ["ቼ", "ት", "ቴ"],
    correct: "ቴ",
    image: tv,
  },
];

const Objects = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const handleOptionClick = (option) => {
    const current = questions[currentQ];

    if (option === current.correct) {
      setScore(score + 1);
      setFeedback("Correct! ✅");
      setTimeout(() => {
        goToNextQuestion();
      }, 1000);
    } else {
      if (tries === 0) {
        setTries(1);
        setFeedback("Try again ❌");
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
      setFeedback("");
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setTries(0);
    setScore(0);
    setFeedback("");
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="game-container" style={{ textAlign: "center", padding: "10rem" }}>
        <h2>Game Over 🎉</h2>
        <p>
          You got {score} out of {questions.length} right!
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <button
            onClick={handleRetry}
            style={{
              margin: "0.5rem",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#431b06",
              color: "#d59c38",
              border: "none",
            }}
          >
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              margin: "0.5rem",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#431b06",
              color: "#d59c38",
              border: "none",
            }}
          >
            Finish
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div
      className="game-container"
      style={{ textAlign: "center", padding: "2rem", position: "relative" }}
    >
      <button
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: "#431B06",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
        }}
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          backgroundColor: "#431B06",
          color: "white",
          padding: "0.4rem 0.8rem",
          borderRadius: "12px",
          fontWeight: "bold",
        }}
      >
        Score: {score}
      </div>

      <img src={q.image} alt="quiz" style={{ width: "150px", height: "150px" }} />
      <h2>Fill in the blank: {q.display}</h2>
      <div style={{ margin: "1rem" }}>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleOptionClick(opt)}
            style={{ margin: "0.5rem", padding: "1rem", fontSize: "1.5rem" }}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback && <p style={{ fontSize: "1.2rem" }}>{feedback}</p>}
    </div>
  );
};

export default Objects;
