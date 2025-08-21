import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

export default function PieChartComponent({ data }) {
  const totalIntake = data.reduce(
    (sum, item) => sum + Number(item.calorieIntake),
    0
  );
  const totalBurned = data.reduce(
    (sum, item) => sum + Number(item.calorieBurned),
    0
  );

  const chartData = [
    { name: "Calories Intake", value: totalIntake },
    { name: "Calories Burned", value: totalBurned },
  ];

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
