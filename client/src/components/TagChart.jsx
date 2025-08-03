// src/components/TagChart.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#14b8a6",
  "#f43f5e", "#a855f7", "#84cc16", "#0ea5e9"
];

const TagChart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("bar"); // "bar" or "pie"

  useEffect(() => {
    const raw = localStorage.getItem("crm-customers");
    if (!raw) return;

    const customers = JSON.parse(raw);
    const tagCounts = {};

    customers.forEach((customer) => {
      if (Array.isArray(customer.tags)) {
        customer.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const data = Object.entries(tagCounts).map(([tag, count]) => ({
      tag,
      count,
    }));

    setChartData(data);
  }, []);

  return (
    <div className="bg-white p-6 mt-6 rounded-2xl shadow-md">
      <div className="flex justify-end items-center mb-4">
        
        <button
          onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transitiontext-sm transition"
        >
          Switch to {chartType === "bar" ? "Pie" : "Bar"} Chart
        </button>
      </div>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm">No tag data available yet.</p>
      ) : chartType === "bar" ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="tag" stroke="#8884d8" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="tag"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TagChart;
