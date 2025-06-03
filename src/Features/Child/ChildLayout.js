import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Create this if you haven't
import "./ChildLayout.css"; // Optional styling

const ChildLayout = () => {
  return (
    <div className="child-layout"> 
      <Sidebar />
      <div className="child-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ChildLayout;
