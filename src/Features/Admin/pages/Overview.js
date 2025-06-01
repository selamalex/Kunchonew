import { Line, Bar } from "react-chartjs-2"
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
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const Overview = () => {
  // Line chart data
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
  }

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
  }

  // Bar chart data
  const barChartData = {
    labels: ["Books", "Music", "Others", "Videos"],
    datasets: [
      {
        label: "Content Count",
        data: [150, 220, 180, 250],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(0, 0, 0, 0.6)",
          "rgba(100, 149, 237, 0.6)",
        ],
      },
    ],
  }

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
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Overview</h1>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">965</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Contents</div>
          <div className="stat-value">671</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Notification sent</div>
          <div className="stat-value">156</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Users</div>
          <div className="stat-value">2,318</div>
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
  )
}

export default Overview

