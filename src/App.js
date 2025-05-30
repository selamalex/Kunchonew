// src/App.jsx
import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

// General landing page
import GeneralHome from "./Pages/GeneralHome";

// Login
import Login from "./Pages/Login";

// Admin pages
import AdminDashboard from "./Features/Admin/AdminDashboard";
import ContentManagement from "./Features/Admin/ContentManagement";
import Reports from "./Features/Admin/Reports";
import Settings from "./Features/Admin/Settings";
import UserManagement from "./Features/Admin/UserManagement";

// Parent pages
import ParentDashboard from "./Features/Parent/ParentDashboard";
import ScreenTimeReport from "./Features/Parent/ScreenTimeReport";
import SubAccountManagement from "./Features/Parent/SubAccountManagement";

// Child pages
import Animals from "./Features/Child/Animals";
import Audios from "./Features/Child/Audios";
import Books from "./Features/Child/Books";
import ChildDashboard from "./Features/Child/ChildDashboard";
import Games from "./Features/Child/Games";
import Objects from "./Features/Child/Objects";
import SlideBook from "./Features/Child/SlideBook";
import SpecificVid from "./Features/Child/SpecificVid"; // ✅ Video detail page
import Vegetables from "./Features/Child/Vegetables";
import Videos from "./Features/Child/Videos"; // ✅ Video list page

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<GeneralHome />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        {user?.role === "admin" && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/reports" element={<Reports />} />
          </>
        )}

        {/* Parent Routes */}
        {user?.role === "parent" && (
          <>
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/subaccounts" element={<SubAccountManagement />} />
            <Route path="/parent/screentime" element={<ScreenTimeReport />} />
          </>
        )}

        {/* Child Routes */}
        {user?.role === "child" && (
          <>
            <Route path="/child/dashboard" element={<ChildDashboard />} />
            <Route path="/child/videos" element={<Videos />} />
            <Route path="/child/videos/:videoId" element={<SpecificVid />} /> {/* ✅ Shows 1 vid */}
            <Route path="/child/books" element={<Books />} />
            <Route path="/child/audios" element={<Audios />} />
            <Route path="/child/games" element={<Games />} />
            <Route path="/child/games/animal" element={<Animals />} />
            <Route path="/child/games/vegetable" element={<Vegetables />} />
            <Route path="/child/games/object" element={<Objects />} />
            <Route path="/child/books/:bookId" element={<SlideBook />} />
          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
