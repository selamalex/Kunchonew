import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <ul className="desktop-nav">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#services">Service</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <button onClick={() => navigate("/login")} className="auth-btn">
          Login
        </button>
        <button onClick={() => navigate("/signup")} className="auth-btn">
          Signup
        </button>
      </div>

      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <a href="#home" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>
                Service
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="mobile-auth-btn"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="mobile-auth-btn"
              >
                Signup
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
