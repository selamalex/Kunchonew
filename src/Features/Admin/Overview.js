import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./admin.css";
import "./Sidebar.css";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Overview = () => {
  const { user } = useContext(AuthContext);

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    admins: 0,
    parents: 0,
    children: 0,
  });

  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [contentStats, setContentStats] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        // Fetch user role stats
        const userRes = await fetch(
          "http://localhost:3000/api/admins/users/count",
          { headers }
        );
        if (!userRes.ok)
          throw new Error(`User counts fetch failed: ${userRes.status}`);
        const userData = await userRes.json();
        console.log("User counts data:", userData);
        setUserStats(userData);

        // Fetch monthly registrations
        const monthRes = await fetch(
          "http://localhost:3000/api/admins/reports/users-per-month",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        if (!monthRes.ok)
          throw new Error(`Monthly users fetch failed: ${monthRes.status}`);
        const monthData = await monthRes.json();
        console.log("Monthly users data:", monthData);
        setMonthlyUsers(monthData);

        // Fetch content stats
        const contentRes = await fetch(
          "http://localhost:3000/api/admins/reports/content-by-type",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        if (!contentRes.ok)
          throw new Error(`Content stats fetch failed: ${contentRes.status}`);
        const contentData = await contentRes.json();
        console.log("Content stats data:", contentData);
        setContentStats(contentData);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [user]);

  // Prepare monthly user data for line chart
  const groupedByMonth = new Array(12).fill(0);

  monthlyUsers.forEach((item) => {
    if (item.month) {
      const monthIndex = new Date(item.month).getMonth(); // getMonth() returns 0-11
      const count = Number(item.count) || 0;
      groupedByMonth[monthIndex] = count;
    }
  });

  const lineChartData = {
    labels: monthsShort,
    datasets: [
      {
        label: "Users Registered",
        data: groupedByMonth,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true, precision: 0 } },
  };

  // Prepare content chart data for bar chart
  const barChartData = {
    labels: contentStats.map((c) => c.type || "Unknown"),
    datasets: [
      {
        label: "Content Count",
        data: contentStats.map((c) => Number(c.count) || 0),
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(0, 0, 0, 0.6)",
          "rgba(100, 149, 237, 0.6)",
        ],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, precision: 0 } },
  };

  return (
    <div className="admin-container">
      <div className="page-container">
        <h1 className="page-header">Overview</h1>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{userStats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Admins</div>
            <div className="stat-value">{userStats.admins}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Parents</div>
            <div className="stat-value">{userStats.parents}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Children</div>
            <div className="stat-value">{userStats.children}</div>
          </div>
        </div>

        <div className="chart-container">
          <h2 className="chart-header">Monthly User Registrations</h2>
          <div style={{ height: "300px" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <h2 className="chart-header">Content by Category</h2>
          <div style={{ height: "300px" }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
