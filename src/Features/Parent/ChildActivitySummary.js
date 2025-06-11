import React from "react";
import "./ChildActivitySummary.css";

const ChildActivitySummary = () => {
  return (
    <div className="child-summary">
      <div className="child-card">
        <h3>🎮 Games</h3>
        <p>Fun and educational games for your children.</p>
      </div>
      <div className="child-card">
        <h3>🔊 Audio</h3>
        <p>Engaging stories and learning sounds.</p>
      </div>
      <div className="child-card">
        <h3>❓ Quizzes</h3>
        <p>Simple quizzes to reinforce learning.</p>
      </div>

      <div className="tip-card">
        <div className="tip-header">
          <span className="tip-icon">💡</span>
          <h4>Parenting Tips</h4>
        </div>
        <ul className="tip-list">
          <li>🕒 Set healthy screen time limits for your child.</li>
          <li>🧠 Mix play with learning for better results.</li>
          <li>📊 Review learning progress weekly.</li>
          <li>🎧 Encourage listening to stories before bed.</li>
          <li>👪 Make time for offline family activities.</li>
        </ul>
      </div>
    </div>
  );
};

export default ChildActivitySummary;
