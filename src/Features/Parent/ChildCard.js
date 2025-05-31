import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./ChildAccounts.css";

const ChildCard = ({ name = "", userGroup, age }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    const childUser = {
      role: "child",
      //username: name.toLowerCase().replace(/\s+/g, "-"),
      //displayName: name,
      userGroup: userGroup,
      age: age,
    };

    // Set user and wait for state to update
    await setUser(childUser);

    // Navigate after state is updated
    navigate("/child/dashboard", { replace: true });
  };

  return (
    <div className="child-card">
      <div className="child-avatar" style={{ backgroundColor: "#f5a12b" }}>
        {name.charAt(0).toUpperCase()}
      </div>
      <h4>{name}</h4>
      <p>Age: {age}</p>
      <button
        className="login-btn"
        onClick={handleLogin}
        style={{ backgroundColor: "#f5a12b" }}
      >
        Login as {name.split(" ")[0]}
      </button>
    </div>
  );
};

export default ChildCard;
