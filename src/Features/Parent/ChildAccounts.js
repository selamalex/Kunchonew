import React from "react";
import ChildCard from "./ChildCard";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import "./ChildAccounts.css";

const childrenData = [
  { name: "Mimi", age: 6, avatar: "/avatars/mimi.png" },
  { name: "Lulu", age: 7, avatar: "/avatars/lulu.png" },
];

const ChildAccounts = () => {
  return (
    <div className="child-accounts-section">
      <h3 className="section-title">Children’s Account</h3>
      <div className="card-container">
        {childrenData.map((child, index) => (
          <ChildCard key={index} {...child} />
        ))}
        <div className="child-card add-card">
          <FaPlus className="add-icon" />
          <p>Add Child</p>
        </div>
      </div>
      <div className="more-icon">
        <FaEllipsisH />
      </div>
    </div>
  );
};

export default ChildAccounts;
