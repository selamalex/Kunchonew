"use client"

import { useState } from "react"
import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Reports = () => {
  const [reportType, setReportType] = useState("user")
  const [timeRange, setTimeRange] = useState("month")

  // User activity data
  const userActivityData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Active Users",
        data: [1200, 1900, 1700, 2318],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
    ],
  }

  // Content usage data
  const contentUsageData = {
    labels: ["Books", "Music", "Videos", "Others"],
    datasets: [
      {
        label: "Usage Count",
        data: [350, 420, 580, 280],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(100, 149, 237, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  }

  // User demographics data
  const userDemographicsData = {
    labels: ["Parents", "Children", "Admins"],
    datasets: [
      {
        label: "User Count",
        data: [200, 130, 5],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Reports</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <label htmlFor="report-type" style={{ marginRight: "8px" }}>
            Report Type:
          </label>
          <select
            id="report-type"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="search-input"
            style={{ padding: "8px", marginRight: "16px" }}
          >
            <option value="user">User Activity</option>
            <option value="content">Content Usage</option>
            <option value="demographics">User Demographics</option>
          </select>

          <label htmlFor="time-range" style={{ marginRight: "8px" }}>
            Time Range:
          </label>
          <select
            id="time-range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="search-input"
            style={{ padding: "8px" }}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        <button className="button">
          <i className="fas fa-download" style={{ marginRight: "8px" }}></i>
          Export Report
        </button>
      </div>

      {reportType === "user" && (
        <div className="chart-container">
          <h2 className="chart-header">User Activity</h2>
          <div style={{ height: "400px" }}>
            <Line data={userActivityData} options={chartOptions} />
          </div>
          <div style={{ marginTop: "24px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Active Users</th>
                  <th>New Users</th>
                  <th>Returning Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Week 1</td>
                  <td>1,200</td>
                  <td>320</td>
                  <td>880</td>
                </tr>
                <tr>
                  <td>Week 2</td>
                  <td>1,900</td>
                  <td>450</td>
                  <td>1,450</td>
                </tr>
                <tr>
                  <td>Week 3</td>
                  <td>1,700</td>
                  <td>280</td>
                  <td>1,420</td>
                </tr>
                <tr>
                  <td>Week 4</td>
                  <td>2,318</td>
                  <td>618</td>
                  <td>1,700</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportType === "content" && (
        <div className="chart-container">
          <h2 className="chart-header">Content Usage</h2>
          <div style={{ height: "400px" }}>
            <Bar data={contentUsageData} options={chartOptions} />
          </div>
          <div style={{ marginTop: "24px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Content Type</th>
                  <th>Total Views</th>
                  <th>Unique Users</th>
                  <th>Avg. Time Spent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Books</td>
                  <td>350</td>
                  <td>180</td>
                  <td>15 min</td>
                </tr>
                <tr>
                  <td>Music</td>
                  <td>420</td>
                  <td>210</td>
                  <td>22 min</td>
                </tr>
                <tr>
                  <td>Videos</td>
                  <td>580</td>
                  <td>320</td>
                  <td>18 min</td>
                </tr>
                <tr>
                  <td>Others</td>
                  <td>280</td>
                  <td>150</td>
                  <td>10 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportType === "demographics" && (
        <div className="chart-container">
          <h2 className="chart-header">User Demographics</h2>
          <div style={{ height: "400px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%" }}>
              <Pie data={userDemographicsData} options={chartOptions} />
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>User Type</th>
                  <th>Count</th>
                  <th>Percentage</th>
                  <th>Growth (vs. Last Month)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Parents</td>
                  <td>200</td>
                  <td>59.7%</td>
                  <td>+15%</td>
                </tr>
                <tr>
                  <td>Children</td>
                  <td>130</td>
                  <td>38.8%</td>
                  <td>+22%</td>
                </tr>
                <tr>
                  <td>Admins</td>
                  <td>5</td>
                  <td>1.5%</td>
                  <td>0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports