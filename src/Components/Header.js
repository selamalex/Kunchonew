import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav">
        <ul>
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
    </header>
  );
};

export default Header;
