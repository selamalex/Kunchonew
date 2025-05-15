import React from "react";
import "./ChildAccounts.css";

const ChildCard = ({ name, age, avatar }) => {
  return (
    <div className="child-card">
      <img src={avatar} alt={name} className="avatar" />
      <h4>{name}</h4>
      <p>Age: {age}</p>
      <button className="login-btn">Login</button>
    </div>
  );
};

export default ChildCard;
