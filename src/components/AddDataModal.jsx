import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const initialFormState = {
  date: "",
  calorieIntake: "",
  calorieBurned: "",
  description: "",
};

export default function AddDataModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState(initialData || initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      ...formData,
      id: isEditMode ? initialData.id : Date.now(),
    };

    if (isEditMode) {
      onSave(newEntry, true); // true means it's an edit
    } else {
      onSave(newEntry);
    }

    setFormData(initialFormState);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Today's Data"
      className="max-w-md mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Update Today's Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input */}
        <div>
          <label className="block mb-1 text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Calorie Intake */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Calorie Intake
          </label>
          <input
            type="number"
            name="calorieIntake"
            placeholder="Enter Today's Calorie Intake"
            value={formData.calorieIntake}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Calorie Burned */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Calorie Burned
          </label>
          <input
            type="number"
            name="calorieBurned"
            placeholder="Enter Today's Calorie Burned"
            value={formData.calorieBurned}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Short Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter a short description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
