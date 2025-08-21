import { FaEdit, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";

export default function RecentStats({
  data,
  setData,
  setModalOpen,
  setEditingData,
}) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
    }
  };

  const handleEdit = (entry) => {
    setEditingData(entry);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {data
        .slice() // copy to avoid mutation
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <p className="font-semibold">
                {dayjs(item.date).format("DD MMM YYYY")}
              </p>
              <p>Calorie Intake: {item.calorieIntake}</p>
              <p>Calorie Burned: {item.calorieBurned}</p>
              <p className="italic text-sm mt-1">{item.description}</p>
            </div>

            <div className="flex gap-4 mt-3 sm:mt-0">
              <button
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit(item)}
              >
                <FaEdit /> <span>Edit</span>
              </button>
              <button
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                onClick={() => handleDelete(item.id)}
              >
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
