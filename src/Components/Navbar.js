import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../Features/Child/Avatar";
import "./Navbar.css";

export default function Navbar({ pageName }) {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!searchTerm.trim()) return;

    try {
      const query = encodeURIComponent(searchTerm);
      const response = await fetch(
        `http://localhost:3000/api/child/content/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleResultClick = (result) => {
    setResults([]); // Close dropdown
    if (result.type.toLowerCase() === "video") {
      navigate(`/child/videos/${result.id}`);
    } else if (result.type.toLowerCase() === "book") {
      window.open(result.filePath, "_blank");
    } else {
      alert(`Unsupported content type: ${result.type}`);
    }
  };

  const handleAvatarClick = (avatarUrl) => {
    console.log("Avatar changed to:", avatarUrl);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="page-name">{pageName}</div>

      <div className="search-container" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button
          className="search-btn"
          onClick={handleSearchSubmit}
          aria-label="Search"
        >
          🔍
        </button>

        {results.length > 0 && (
          <ul className="search-results-dropdown">
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() => handleResultClick(item)}
                className="search-result-item"
              >
                {item.title} ({item.type})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="user-profile">
        <Avatar onClick={handleAvatarClick} />
      </div>
    </nav>
  );
}
