import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditClassModal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cls, setCls] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [repeat, setRepeat] = useState("none");
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("classes")) || [];
    const found = stored.find((c) => String(c.id) === String(id));
    if (found) {
      setCls(found);
      setTitle(found.title);
      setDate(found.date.slice(0, 16)); // format for datetime-local input
      setRepeat(found.repeat || "none");
      setRepeatCount(found.repeatCount || 1);
    } else {
      setCls(null);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedClass = {
      ...cls,
      title,
      date: new Date(date).toISOString(),
      repeat,
      repeatCount,
    };

    const allClasses = JSON.parse(localStorage.getItem("classes")) || [];
    const updatedList = allClasses.map((c) =>
      String(c.id) === String(id) ? updatedClass : c
    );

    localStorage.setItem("classes", JSON.stringify(updatedList));
    navigate("/");
  };

  if (cls === null) {
    return (
      <div className="p-6 text-center text-red-500 text-lg">
        Class not found. Please check the link or return to dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4">Edit Class</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">
              Repeat Count
            </label>
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
            onClick={() => navigate("/dashboard")}
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
  );
}
