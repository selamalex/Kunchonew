import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./ChildActivitySummary.css";

const ChildActivitySummary = () => {
  const [highestRated, setHighestRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHighestRated = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/parent/childs/highestrated",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setHighestRated(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHighestRated();
  }, []);

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
        <h3>🎥 Videos</h3>
        <p>Educational and entertaining videos for kids.</p>
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

      <div className="childd-card">
        <h3>⭐ Your children's highest Rated Content</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && highestRated.length === 0 && (
          <p>No top-rated content found.</p>
        )}
        <ul>
          {highestRated.map((entry, index) => (
            <li key={index} style={{ marginBottom: "1rem", listStyle: "none" }}>
              <strong>👧 {entry.child.name}</strong>
              {entry.highestRatedContent ? (
                <div style={{ marginTop: "0.5rem" }}>
                  <img
                    src={`http://localhost:3000${entry.highestRatedContent.thumbnail}`}
                    alt={entry.highestRatedContent.title}
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p>
                    <strong>{entry.highestRatedContent.title}</strong> -{" "}
                    {entry.highestRatedContent.type} - {entry.rating}⭐
                  </p>
                </div>
              ) : (
                <p style={{ marginLeft: "1rem" }}>Rated nothing yet.</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChildActivitySummary;
