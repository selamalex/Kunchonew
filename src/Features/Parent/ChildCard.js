import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./ChildCard.css";

const ChildCard = ({
  name = "",
  userGroup,
  age,
  avatarUrl = "",
  screenTime,
  onDelete,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [childData, setChildData] = useState({
    name,
    age,
    userGroup,
    avatarUrl,
    screenTime,
  });
  const fileInputRef = useRef(null);

  const firstName = name.split(" ")[0];

  const handleView = () => {
    setShowDetails(true);
  };

  const handleUpdate = () => {
    if (isEditing) {
      onUpdate(childData);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete();
    setShowDetails(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChildData((prev) => ({
          ...prev,
          avatarUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="child-card">
        <div className="child-avatar" onClick={handleAvatarClick}>
          {childData.avatarUrl ? (
            <img src={childData.avatarUrl} alt={`${firstName}'s avatar`} />
          ) : (
            <div className="avatar-initial">
              {firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h4>{firstName}</h4>
        <p>Age: {age}</p>
        <button className="view-btn" onClick={handleView}>
          View
        </button>
      </div>

      {showDetails && (
        <div className="details-modal">
          <div className="details-content">
            <button className="close-btn" onClick={() => setShowDetails(false)}>
              ×
            </button>

            <div
              className="child-avatar large"
              onClick={isEditing ? handleAvatarClick : null}
              style={{ cursor: isEditing ? "pointer" : "default" }}
            >
              {childData.avatarUrl ? (
                <img src={childData.avatarUrl} alt={`${firstName}'s avatar`} />
              ) : (
                <div className="avatar-initial">
                  {firstName.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <div className="avatar-upload-hint">Click to upload</div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />

            {isEditing ? (
              <div className="edit-form">
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={childData.age}
                    onChange={handleInputChange}
                    min="1"
                  />
                </label>
                <label>
                  Group:
                  <input
                    type="text"
                    name="userGroup"
                    value={childData.userGroup}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Timer Minutes:
                  <input
                    type="number"
                    name="timerMinutes"
                    value={childData.timerMinutes}
                    onChange={handleInputChange}
                    min="1"
                  />
                </label>
              </div>
            ) : (
              <div className="details-info">
                <h3>{childData.name}</h3>
                <p>
                  <strong>Age:</strong> {childData.age}
                </p>
                <p>
                  <strong>Group:</strong> {childData.userGroup}
                </p>
                <p>
                  <strong>Timer:</strong> {childData.screenTime} minutes
                </p>
              </div>
            )}

            <div className="action-buttons">
              <button className="update-btn" onClick={handleUpdate}>
                {isEditing ? "Save" : "Update"}
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildCard;
