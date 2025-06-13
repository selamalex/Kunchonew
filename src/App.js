import { useAuth } from "./Context/AuthContext";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// General landing page
import GeneralHome from "./Pages/GeneralHome";

// Login/Signup
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import Signup from "./Pages/Signup";

// Admin pages
import AdminLayout from "./Features/Admin/adminlayout";
import ContentManagement from "./Features/Admin/ContentManagement";
import Notifications from "./Features/Admin/Notifications";
import Overview from "./Features/Admin/Overview";
import Reports from "./Features/Admin/Reports";
import Settings from "./Features/Admin/Settings";
import UserManagement from "./Features/Admin/UserManagement";

// Parent pages
import ParentDashboard from "./Features/Parent/ParentDashboard";
import ParentLayout from "./Features/Parent/ParentLayout";
import ScreenTimeReport from "./Features/Parent/ScreenTimeReport";
import SubAccountManagement from "./Features/Parent/SubAccountManagement";
import Subscribe from "./Features/Parent/Subscribe";

// Child pages
import Animals from "./Features/Child/Animals";
import Audios from "./Features/Child/Audios";
import Books from "./Features/Child/Books";
import ChildDashboard from "./Features/Child/ChildDashboard";
import ChildLayout from "./Features/Child/ChildLayout";
import Games from "./Features/Child/Games";
import LockScreen from "./Features/Child/LockScreen";
import Objects from "./Features/Child/Objects";
import SlideBook from "./Features/Child/SlideBook";
import SpecificAud from "./Features/Child/SpecificAud";
import SpecificVid from "./Features/Child/SpecificVid";
import Vegetables from "./Features/Child/Vegetables";
import Videos from "./Features/Child/Videos";
import Vocabulary from "./Features/Child/vocabulary";

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
             <Route path=" child/vocabulary" element={<Vocabulary />} />
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
