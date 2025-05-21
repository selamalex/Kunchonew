// src/components/Header.jsx
import './ChildHeader.css';

const Header = ({ pageTitle, username = "Ruhama Belay" }) => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="page-title">{pageTitle}</span>
      </div>

      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-input" />
          <span className="search-icon">🔍</span>
        </div>
        <div className="profile-box">
          <span className="username">{username}</span>
          <div className="avatar">👤</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
