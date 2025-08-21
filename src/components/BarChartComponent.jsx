import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

// Helper: Get last 7 days' data
const getLast7DaysData = (data) => {
  const today = dayjs();
  return data
    .filter((entry) => dayjs(entry.date).isAfter(today.subtract(7, "day")))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default function BarChartComponent({ data }) {
  const last7DaysData = getLast7DaysData(data);

  const chartData = last7DaysData.map((entry) => ({
    date: dayjs(entry.date).format("DD MMM"),
    intake: Number(entry.calorieIntake),
    burned: Number(entry.calorieBurned),
  }));

  return (
    <div className="h-72 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="intake" fill="#00C49F" name="Calorie Intake" />
          <Bar dataKey="burned" fill="#FF8042" name="Calorie Burned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
