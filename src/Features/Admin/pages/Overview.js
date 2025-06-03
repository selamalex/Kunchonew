import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import "../components/admin.css";
import "../components/Sidebarr.css";
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

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    admins: 9,
    parents: 0,
    children: 0,
  });

  // Fetch user stats from backend
  useEffect(() => {
    if (!user?.token) return; // wait for token

    const fetchUserStats = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/admins/users/count",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          const text = await res.text();
          console.error("API error response:", text); // Logs the HTML or error
          return;
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          console.log("Parsed user stats:", data);
          setUserStats(data);
        } else {
          const text = await res.text();
          console.error("Expected JSON but got:", text);
        }
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      }
    };

    fetchUserStats();
  }, [user]); // 👈 important dependency

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "This year",
        data: [50, 30, 60, 70, 90, 80, 90],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
      {
        label: "Last year",
        data: [30, 40, 35, 50, 49, 60, 70],
        borderColor: "rgb(153, 102, 255)",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const barChartData = {
    labels: ["Books", "Music", "Others", "Videos"],
    datasets: [
      {
        label: "Content Count",
        data: [150, 220, 180, 250], // Replace with backend data if needed
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
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
          <h2 className="chart-header">Total Users</h2>
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
