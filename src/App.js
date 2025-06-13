import { useAuth } from "./Context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// General landing page
import GeneralHome from "./Pages/GeneralHome";

// Login/Signup
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

// Admin pages
import ContentManagement from "./Features/Admin/ContentManagement";
import Reports from "./Features/Admin/Reports";
import Settings from "./Features/Admin/Settings";
import UserManagement from "./Features/Admin/UserManagement";
import Overview from "./Features/Admin/Overview";
import AdminLayout from "./Features/Admin/adminlayout";
import Notifications from "./Features/Admin/Notifications";

// Parent pages
import ParentDashboard from "./Features/Parent/ParentDashboard";
import SubAccountManagement from "./Features/Parent/SubAccountManagement";
import ScreenTimeReport from "./Features/Parent/ScreenTimeReport";
import ParentLayout from "./Features/Parent/ParentLayout";
import Subscribe from "./Features/Parent/Subscribe";

// Child pages
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
import ChildLayout from "./Features/Child/ChildLayout";
import LockScreen from "./Features/Child/LockScreen";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Admin Routes */}
        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        )}

        {/* Parent Routes */}
        {/* Parent Routes */}
        {user?.role === "parent" && (
          <Route path="/parent" element={<ParentLayout />}>
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="subaccounts" element={<SubAccountManagement />} />
            <Route path="screentime" element={<ScreenTimeReport />} />
            <Route path="subscribe" element={<Subscribe />} />
          </Route>
        )}

        {user?.role === "child" && (
          <Route
            path="/child"
            element={
              <ProtectedRoute role="child">
                <ChildLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<ChildDashboard />} />
            <Route path="videos" element={<Videos />} />
            <Route path="videos/:id" element={<SpecificVid />} />
            <Route path="books" element={<Books />} />
            <Route path="books/:bookId" element={<SlideBook />} />
            <Route path="audios" element={<Audios />} />
            <Route path="audios/:id" element={<SpecificAud />} />
            <Route path="games" element={<Games />} />
            <Route path="games/animal" element={<Animals />} />
            <Route path="games/vegetable" element={<Vegetables />} />
            <Route path="games/object" element={<Objects />} />
            <Route path="locked" element={<LockScreen />} />
          </Route>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
