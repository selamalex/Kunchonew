import { Link } from 'react-router-dom';
import LogoutButton from '../../Components/LogoutButton';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/admin/users">User Management</Link></li>
          <li><Link to="/admin/content">Content Management</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
          <li><Link to="/admin/reports">Reports</Link></li>
        </ul>
        <LogoutButton />
      </div>
      <div className="main-content">
        <h2 className="text-xl mb-4">Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;