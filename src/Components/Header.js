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
      <button onClick={() => navigate("/login")} className="px-6 py-2 ">
        Login
      </button>
    </header>
  );
};

export default Header;
