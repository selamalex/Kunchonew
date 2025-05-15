import React from "react";
import { FaBook, FaChalkboardTeacher, FaGamepad } from "react-icons/fa";
import "./CardsSection.css";
import learningImg from "../Assets/images/Learning.png";
import booksImg from "../Assets/images/entertainment.png";
import gamesImg from "../Assets/images/games.png";

function CardsSection() {
  return (
    <section className="cards-wrapper" id="services">
      <h2 className="cards-title">Our Services</h2>
      <div className="cards-section">
        <div className="card glassmorphic">
          <img src={learningImg} alt="Learning Material" />
          <FaChalkboardTeacher className="card-icon" />
          <h3>Learning Material</h3>
        </div>
        <div className="card glassmorphic large-card">
          <img src={gamesImg} alt="Games for Children" />
          <FaGamepad className="card-icon" />
          <h3>Games for Children</h3>
        </div>
        <div className="card glassmorphic">
          <img src={booksImg} alt="Books for Your Children" />
          <FaBook className="card-icon" />
          <h3>Books for Your Children</h3>
        </div>
      </div>
    </section>
  );
}

export default CardsSection;
