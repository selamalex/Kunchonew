import { useState } from "react";
import Abush from "../../Assets/images/Abush.png";
import Bitiko from "../../Assets/images/Bitiko.png";
import Mitu from "../../Assets/images/Mitu.png";
import Birabiro from "../../Assets/images/butterfly.png";
import Wero from "../../Assets/images/catface.jpg";
import Buch from "../../Assets/images/dog.png";
import Kuku from "../../Assets/images/hen.png";
import "./Avatar.css";
const avatarOptions = [
  Bitiko, Abush, Mitu, Kuku, Buch, Wero, Birabiro
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
