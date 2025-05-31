import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./ChildAccounts.css";

const ChildCard = ({ name = "", userGroup, age }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const firstName = name.split(" ")[0]; // Only take the first word as the first name

  const handleLogin = async () => {
    const childUser = {
      role: "child",
      userGroup,
      age,
    };

    await setUser(childUser);
    navigate("/child/dashboard", { replace: true });
  };

  return (
    <div className="child-card">
      <div className="child-avatar" style={{ backgroundColor: "#f5a12b" }}>
        {firstName.charAt(0).toUpperCase()}
      </div>
      <h4>{firstName}</h4>
      <p>Age: {age}</p>
      <button
        className="login-btn"
        onClick={handleLogin}
        style={{ backgroundColor: "#f5a12b" }}
      >
        Login as {firstName}
      </button>
    </div>
  );
};

export default ChildCard;
