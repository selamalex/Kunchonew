import { Link } from 'react-router-dom';
import LogoutButton from '../../Components/LogoutButton';

const ParentDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Kuncho</div>
        <ul>
          <li><Link to="/parent/subaccounts">Sub Account Management</Link></li>
          <li><Link to="/parent/screentime">Screen Time Report</Link></li>
        </ul>
        <LogoutButton />
      </div>
      <div className="main-content">
        <h2 className="text-xl mb-4">Parent Dashboard</h2>
      </div>
    </div>
  );
};

export default ParentDashboard;