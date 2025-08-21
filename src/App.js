import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddDataModal from "./components/AddDataModal";
import PieChartComponent from "./components/PieChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import RecentStats from "./components/RecentStats";

function App() {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("healthAndFitness")) || [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // ✅ Debounce localStorage write
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("healthAndFitness", JSON.stringify(data));
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setModalOpen(true);
            setEditingData(null);
          }}
        >
          + Add data
        </button>
      </div>

 

      {data.length > 0 && (
        <>
          <div className="mt-8 px-4">
            <h2 className="text-xl font-semibold mb-4">Weekly Health Trends</h2>
            <BarChartComponent data={data} />
          </div>

          <div className="mt-8 px-4">
            <h2 className="text-xl font-semibold mb-4">
              Recent Health Statistics
            </h2>
            <RecentStats
              data={data}
              setData={setData}
              setModalOpen={setModalOpen}
              setEditingData={setEditingData}
            />
          </div>
        </>
      )}

      <AddDataModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingData}
        onSave={(entry, isEdit = false) => {
          if (isEdit) {
            setData((prev) => prev.map((d) => (d.id === entry.id ? entry : d)));
          } else {
            setData((prev) => [...prev, entry]);
          }
        }}
      />
           <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Overall Data</h2>
        <PieChartComponent data={data} />
      </div>
    </div>
  );
}

export default App;
