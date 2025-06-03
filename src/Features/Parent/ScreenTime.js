import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaTachometerAlt, FaClock } from "react-icons/fa";
import LogoutButton from "../../Components/LogoutButton";
import logo from "../../Assets/images/logo.png";
import { AuthContext } from "../../Context/AuthContext";
import abushImage from "../../Assets/images/Abush.png";
import "./ScreenTime.css";
import "./Sidebar.css";

const ScreenTime = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [screenData, setScreenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedChildIndex, setExpandedChildIndex] = useState(null);

  useEffect(() => {
    const fetchScreenTime = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/parent/childs/screentime",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch screen time data");

        const data = await res.json();
        setScreenData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenTime();
  }, []);

  const toggleExpand = (index) => {
    setExpandedChildIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>
        <ul>
          <li>
            <Link to="/parent/subaccounts">
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime" className="active-link">
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>

      {/* Main Content */}
      <div className="main-content screen-time-section">
        <div
          className="back-arrow"
          onClick={() => navigate("/parent/dashboard")}
        >
          <FaArrowLeft className="back-icon" />
          <span>Back</span>
        </div>

        <h3 className="section-title">Screen Time</h3>
        <p className="subtitle">Children’s Info</p>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="screen-list">
            {/* Header */}
            <div className="screen-card screen-header">
              <div className="child-profile">
                <img
                  src={abushImage}
                  alt="Child Icon"
                  className="child-avatar"
                />
                <span className="child-name">Child</span>
              </div>
              <div className="time-box">
                <p className="time-label">Today</p>
              </div>
              <div className="time-box">
                <p className="time-label">This Week</p>
              </div>
              <div className="time-box">
                <p className="time-label">Action</p>
              </div>
            </div>

            {/* Total Summary */}
            <div className="screen-card">
              <div className="child-profile">
                <span className="child-name">All</span>
              </div>
              <div className="time-box">
                <p className="time-value">{screenData.dailyCount} views</p>
              </div>
              <div className="time-box">
                <p className="time-value">{screenData.weeklyCount} views</p>
              </div>
              <div className="time-box"></div>
            </div>

            {/* Per-child */}
            {screenData.children?.map((child, index) => (
              <div key={index}>
                <div className="screen-card">
                  <div className="child-profile">
                    <span className="child-name">{child.name}</span>
                  </div>
                  <div className="time-box">
                    <p className="time-value">{child.today} views</p>
                  </div>
                  <div className="time-box">
                    <p className="time-value">{child.week} views</p>
                  </div>
                  <div className="time-box">
                    <button
                      className="view-btn"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedChildIndex === index ? "Hide" : "View"}
                    </button>
                  </div>
                </div>

                {expandedChildIndex === index && (
                  <div className="child-details">
                    <p>
                      <strong>Daily:</strong> {child.today} views
                    </p>
                    <p>
                      <strong>Weekly:</strong> {child.week} views
                    </p>

                    <h4>Viewed Content:</h4>
                    {child.viewedContent && child.viewedContent.length > 0 ? (
                      <ul className="content-list">
                        {child.viewedContent.map((item, i) => (
                          <li key={i}>
                            <strong>{item.title}</strong> — {item.date} (
                            {item.duration})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="empty">No content viewed yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenTime;
