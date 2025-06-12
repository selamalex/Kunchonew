"use client";

import { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const { user } = useContext(AuthContext);

  const [avgRatingsData, setAvgRatingsData] = useState([]);
  const [highestRatedContentData, setHighestRatedContentData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [avgRes, topRes] = await Promise.all([
          axios.get("http://localhost:3000/api/admins/content/ratings", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get("http://localhost:3000/api/admins/highest-rated-content", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        setAvgRatingsData(avgRes.data);
        setHighestRatedContentData(topRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getChartDataFromAvgRatings = () => {
    if (!avgRatingsData || avgRatingsData.length === 0) return null;

    const contentTypes = [...new Set(avgRatingsData.map((item) => item.type))];
    const ageGroups = [...new Set(avgRatingsData.map((item) => item.ageGroup))];

    const datasets = ageGroups.map((ageGroup, i) => ({
      label: ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1),
      data: contentTypes.map((type) => {
        const found = avgRatingsData.find(
          (item) => item.type === type && item.ageGroup === ageGroup
        );
        return found ? parseFloat(found.avgRating) : 0;
      }),
      backgroundColor:
        i === 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(153, 102, 255, 0.6)",
    }));

    return {
      labels: contentTypes,
      datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Average Rating by Content Type and Age Group",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 5,
      },
    },
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Content Usage Report</h1>

      <div style={{ height: "400px", marginBottom: "24px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Bar data={getChartDataFromAvgRatings()} options={chartOptions} />
        )}
      </div>

      <h2>Top-Rated Content by Type & Age Group</h2>
      {highestRatedContentData && highestRatedContentData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Content Type</th>
              <th>Age Group</th>
              <th>Title</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {highestRatedContentData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.ageGroup}</td>
                <td>{item.title}</td>
                <td>{item.avgRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No highest-rated content data.</p>
      )}
    </div>
  );
};

export default Reports;
