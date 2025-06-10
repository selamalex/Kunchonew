import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./ChildCard.css";

const ChildCard = ({
  name = "",
  userGroup,
  age,
  avatarUrl = "",
  screentime,
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
    screentime,
  });
  const fileInputRef = useRef(null);

  const firstName = name.split(" ")[0];

  const handleView = () => {
    setShowDetails(true);
  };

  const handleUpdate = async () => {
    if (isEditing) {
      onUpdate(childData);

      try {
        if (childData.screentime) {
          const response = await fetch(
            `/api/parent/childs/screen-time/${childData.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                dailyLimit: parseInt(childData.screentime),
              }),
            }
          );

          const data = await response.json();
          if (!response.ok) {
            console.error("Failed to update screen time:", data.error);
          } else {
            console.log("Screen time updated successfully");
          }
        }
      } catch (error) {
        console.error("Error while updating screen time:", error);
      }
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
                  Screen Time:
                  <input
                    type="number"
                    name="screentime"
                    value={childData.screentime}
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
                  <strong>Timer:</strong> {childData.screentime} minutes
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
