import { useState } from "react";

export default function EditClassModal({ cls, onClose, onUpdate }) {
  const [title, setTitle] = useState(cls.title);
  const [date, setDate] = useState(cls.date.slice(0, 16));
  const [repeat, setRepeat] = useState(cls.repeat || "none");
  const [repeatCount, setRepeatCount] = useState(cls.repeatCount || 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...cls,
      title,
      date: new Date(date).toISOString(),
      repeat,
      repeatCount,
    };

    onUpdate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Edit Class</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium mb-1">Repeat</label>
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {repeat !== "none" && (
            <div>
              <label className="block text-sm font-medium mb-1">Repeat Count</label>
              <input
                type="number"
                min="1"
                max="30"
                value={repeatCount}
                onChange={(e) => setRepeatCount(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
