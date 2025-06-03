 // src/Features/Admin/components/AdminLayout.js
import Sidebar from "./Sidebarr";
import "./Sidebarr.css"; // Styling for sidebar
import "./admin.css";    // Optional global admin styles

const AdminLayout = ({ children }) => {
  return (
    <div className="app">
      <div className="sidebarr"> 
        <Sidebar />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

