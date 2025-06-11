import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Abush from "../../Assets/images/Abush.png";
import Bitiko from "../../Assets/images/Bitiko.png";
import Mitu from "../../Assets/images/Mitu.png";
import Birabiro from "../../Assets/images/butterfly.png";
import Wero from "../../Assets/images/catface.jpg";
import Buch from "../../Assets/images/dog.png";
import Kuku from "../../Assets/images/hen.png";
import "./Avatar.css";

const avatarOptions = [Bitiko, Abush, Mitu, Kuku, Buch, Wero, Birabiro];

// This should match the file path your backend stores (relative path or public URL)
const avatarPaths = [
  "/Abush.png",
  "/Bitiko.png",
  "/Mitu.png",
  "/Kuku.png",
  "/buchi.png",
  "/wero.jpg",
  "/birabiro.png",
];

export default function Avatar({ childId, currentPath, token }) {
  const { user } = useContext(AuthContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const currentIndex = avatarPaths.findIndex((path) =>
    currentPath?.includes(path)
  );
  const [currentAvatar, setCurrentAvatar] = useState(
    currentIndex >= 0 ? currentIndex : 0
  );

  const togglePopup = () => setPopupOpen(!popupOpen);

  const changeAvatar = async (index) => {
    const newPath = avatarPaths[index];
    try {
      await axios.put(
        `http://localhost:3000/api/parent/childs/change-avatar`,
        { avatarPath: newPath },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCurrentAvatar(index);
      setPopupOpen(false);
    } catch (error) {
      console.error("Failed to change avatar:", error);
      console.log("Response data:", error.response?.data);
      console.log("Status code:", error.response?.status);
    }
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
                  alt={`Avatar ${i + 1}`}
                  className={`avatar-option ${
                    i === currentAvatar ? "selected" : ""
                  }`}
                  onClick={() => changeAvatar(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
