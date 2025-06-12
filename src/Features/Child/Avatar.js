import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Abush from "../../Assets/images/Abush.png";
import Bitiko from "../../Assets/images/Bitiko.png";
import Mitu from "../../Assets/images/Mitu.png";
import Birabiro from "../../Assets/images/butterfly.png";
import Wero from "../../Assets/images/catface.jpg";
import Buch from "../../Assets/images/dog.png";
import Kuku from "../../Assets/images/hen.png";
import { AuthContext } from "../../Context/AuthContext";
import "./Avatar.css";

const avatarOptions = [Abush,Bitiko, Mitu, Kuku, Buch, Wero, Birabiro];

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
  const [currentAvatar, setCurrentAvatar] = useState(0);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/parent/childs/profile/${childId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const avatarPath = res.data.avatarPath;
        const index = avatarPaths.findIndex((path) =>
          avatarPath?.includes(path)
        );
        if (index >= 0) setCurrentAvatar(index);
      } catch (error) {
        console.error("Failed to fetch child profile:", error);
      }
    };

    fetchChild();
  }, [childId, token]);

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
