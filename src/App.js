import { useAuth } from "./Context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import GeneralHome from "./Pages/GeneralHome";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import AdminDashboard from "./Features/Admin/pages/Overview";
import UserManagement from "./Features/Admin/pages/UserManagement";
import ContentManagement from "./Features/Admin/pages/ContentManagement";
import Settings from "./Features/Admin/pages/Settings";
import Reports from "./Features/Admin/pages/Reports";

import ParentDashboard from "./Features/Parent/ParentDashboard";
import SubAccountManagement from "./Features/Parent/SubAccountManagement";
import ScreenTimeReport from "./Features/Parent/ScreenTimeReport";

import ChildDashboard from "./Features/Child/ChildDashboard";
import Videos from "./Features/Child/Videos";
import SpecificVid from "./Features/Child/SpecificVid";
import Books from "./Features/Child/Books";
import Audios from "./Features/Child/Audios";
import SpecificAud from "./Features/Child/SpecificAud";
import Games from "./Features/Child/Games";
import Animals from "./Features/Child/Animals";
import Vegetables from "./Features/Child/Vegetables";
import Objects from "./Features/Child/Objects";
import SlideBook from "./Features/Child/SlideBook";
const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};
function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<GeneralHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedRoute role="admin">
              <ContentManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Parent Routes */}
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute role="parent">
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/subaccounts"
          element={
            <ProtectedRoute role="parent">
              <SubAccountManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/screentime"
          element={
            <ProtectedRoute role="parent">
              <ScreenTimeReport />
            </ProtectedRoute>
          }
        />

        {/* Child Routes */}
        <Route
          path="/child/dashboard"
          element={
            <ProtectedRoute role="child">
              <ChildDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/videos"
          element={
            <ProtectedRoute role="child">
              <Videos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/videos/:id"
          element={
            <ProtectedRoute role="child">
              <SpecificVid />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/books"
          element={
            <ProtectedRoute role="child">
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/audios"
          element={
            <ProtectedRoute role="child">
              <Audios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/audios/:id"
          element={
            <ProtectedRoute role="child">
              <SpecificAud />
            </ProtectedRoute>
          }
        />

        <Route
          path="/child/games"
          element={
            <ProtectedRoute role="child">
              <Games />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/games/animal"
          element={
            <ProtectedRoute role="child">
              <Animals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/games/vegetable"
          element={
            <ProtectedRoute role="child">
              <Vegetables />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/games/object"
          element={
            <ProtectedRoute role="child">
              <Objects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/books/:bookId"
          element={
            <ProtectedRoute role="child">
              <SlideBook />
            </ProtectedRoute>
          }
        />

        {/* Redirect /child to dashboard if logged in as child */}
        <Route
          path="/child"
          element={
            user?.role === "child" ? (
              <Navigate to="/child/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
