import { useState } from "react";
import Avatar from "../Features/Child/Avatar";
import "./Navbar.css";

export default function Navbar({ pageName }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Later, add backend or filtering logic here
  };

  const handleAvatarClick = (avatarUrl) => {
    console.log("Avatar changed to:", avatarUrl);
    // You could store or send avatar changes to backend later
  };

  return (
    <nav className="navbar">
      <div className="page-name">{pageName}</div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-btn" aria-label="Search">
          🔍
        </button>
      </div>

      <div className="user-profile">
        <Avatar onClick={handleAvatarClick} />
      </div>
    </nav>
  );
}
