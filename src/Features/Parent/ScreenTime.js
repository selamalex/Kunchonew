import React from "react";
import "./ScreenTime.css";

const screenData = [
  {
    name: "Mimi",
    avatar: "https://randomuser.me/api/portraits/children/5.jpg",
    today: "1h 30m",
    week: "8h 10m",
  },
  {
    name: "Lulu",
    avatar: "https://randomuser.me/api/portraits/children/3.jpg",
    today: "2h 10m",
    week: "10h 5m",
  },
  {
    name: "Yosef",
    avatar: "https://randomuser.me/api/portraits/children/7.jpg",
    today: "45m",
    week: "4h 20m",
  },
];

const ScreenTime = () => {
  return (
    <div className="screen-time-section">
      <h3 className="section-title">Screen Time</h3>
      <p className="subtitle">Children’s Info</p>
      <div className="screen-list">
        {screenData.map((child, index) => (
          <div key={index} className="screen-card">
            <div className="child-profile">
              <img
                src={child.avatar}
                alt={child.name}
                className="child-avatar"
              />
              <span className="child-name">{child.name}</span>
            </div>
            <div className="time-box">
              <p className="time-label">Today</p>
              <p className="time-value">{child.today}</p>
            </div>
            <div className="time-box">
              <p className="time-label">This Week</p>
              <p className="time-value">{child.week}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenTime;
