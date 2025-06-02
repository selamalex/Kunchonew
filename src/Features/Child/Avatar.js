import { useState } from "react";
import "./Avatar.css";

const avatarOptions = [
  "https://i.pravatar.cc/80?img=5",
  "https://i.pravatar.cc/80?img=6",
  "https://i.pravatar.cc/80?img=7",
  "https://i.pravatar.cc/80?img=8",
  "https://i.pravatar.cc/80?img=9",
  "https://i.pravatar.cc/80?img=10",
];

export default function Avatar({ onChange }) {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => setPopupOpen(!popupOpen);

  const selectAvatar = (index) => {
    setCurrentAvatar(index);
    setPopupOpen(false);
    if (onChange) onChange(avatarOptions[index]);
  };

  return (
    <>
      <img
        src={avatarOptions[currentAvatar]}
        alt="User Avatar"
        className="avatar"
        onClick={togglePopup}
        title="Click to change avatar"
        style={{ cursor: "pointer" }}
      />

      {popupOpen && (
        <div className="avatar-popup-backdrop" onClick={togglePopup}>
          <div className="avatar-popup" onClick={(e) => e.stopPropagation()}>
            <h4>Choose Your Avatar</h4>
            <div className="avatar-options">
              {avatarOptions.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt={`Avatar option ${i + 1}`}
                  className={`avatar-option ${
                    i === currentAvatar ? "selected" : ""
                  }`}
                  onClick={() => selectAvatar(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
