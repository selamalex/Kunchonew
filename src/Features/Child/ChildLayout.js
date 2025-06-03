import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "../../Components/Navbar";
import "./ChildLayout.css";

// Optional: dynamic page name from URL
const getPageName = (pathname) => {
  if (pathname.includes("dashboard")) return "Dashboard";
  if (pathname.includes("videos")) return "Videos";
  if (pathname.includes("books")) return "Books";
  if (pathname.includes("audios")) return "Audios";
  if (pathname.includes("games")) return "Games";
  return "Page";
};

const ChildLayout = () => {
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  return (
    <div className="child-layout">
      <Sidebar />
      <div className="child-content">
        <Navbar pageName={pageName} />
        <Outlet />
      </div>
    </div>
  );
};

export default ChildLayout;
