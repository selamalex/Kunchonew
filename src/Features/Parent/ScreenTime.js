import React, { useEffect, useState, useContext } from "react";
import {
  FaArrowLeft,
  FaTachometerAlt,
  FaClock,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "../../Components/LogoutButton";
import logo from "../../Assets/images/logo.png";
import { AuthContext } from "../../Context/AuthContext";
import abushImage from "../../Assets/images/Abush.png";
import moment from "moment";
import "./ScreenTime.css";
import "./Sidebar.css";

const ScreenTime = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [screenData, setScreenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedChildIndex, setExpandedChildIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  }, [user.token]);

  const toggleExpand = async (index, childId) => {
    if (expandedChildIndex === index) {
      setExpandedChildIndex(null);
    } else {
      try {
        const res = await fetch(
          "http://localhost:3000/api/parent/childs/viewedContent",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch viewed content");

        const data = await res.json();
        const updatedChildren = [...screenData.children];
        const matchedChild = data.children.find((c) => c.id === childId);
        if (matchedChild) {
          updatedChildren[index].viewedContent = matchedChild.viewedContent;
        }

        setScreenData((prev) => ({
          ...prev,
          dailyCount: data.dailyCount,
          weeklyCount: data.weeklyCount,
          children: updatedChildren,
        }));

        setExpandedChildIndex(index);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger (Mobile) */}
      <button
        className="sidebar-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Kuncho Logo" className="logo-img" />
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/parent/dashboard" onClick={() => setSidebarOpen(false)}>
              <FaTachometerAlt />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/parent/subaccounts"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTachometerAlt />
              Sub Account Management
            </Link>
          </li>
          <li>
            <Link to="/parent/screentime" onClick={() => setSidebarOpen(false)}>
              <FaClock />
              Screen Time Report
            </Link>
          </li>
        </ul>

        <div className="logout">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
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
                <span className="child-name" id="childs">
                  Child
                </span>
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

            {/* Summary */}
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

            {/* Children */}
            {screenData.children?.map((child, index) => (
              <div key={index}>
                <div className="screen-card">
                  <div className="child-profile">
                    <span className="child-name">
                      {child.childUser
                        ? `${child.childUser.firstName} ${child.childUser.lastName}`
                        : child.name || `Child-${child.id}`}
                    </span>
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
                      onClick={() => toggleExpand(index, child.id)}
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
                            <strong>{item.title}</strong>
                            <br />
                            <span>
                              Date:{" "}
                              {moment(item.date).format("MMM D, YYYY — h:mm A")}
                            </span>
                            <br />
                            <span>Duration: {item.duration}</span>
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
