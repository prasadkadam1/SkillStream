import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ STEP 1: import

export default function CreateClassForm({ onCreate }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [repeat, setRepeat] = useState("none");
  const [repeatCount, setRepeatCount] = useState(1);
  const navigate = useNavigate(); // ✅ STEP 2: use the hook

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const baseTime = new Date(date);
    const id = Date.now();

    let newClasses = [];

    for (let i = 0; i < repeatCount; i++) {
      const repeatDate = new Date(baseTime);
      if (repeat === "daily") repeatDate.setDate(baseTime.getDate() + i);
      else if (repeat === "weekly") repeatDate.setDate(baseTime.getDate() + i * 7);
      else if (repeat === "monthly") repeatDate.setMonth(baseTime.getMonth() + i);

      const roomId = `${title.toLowerCase().replace(/\s+/g, "-")}-${id}-${i}`;
      newClasses.push({
        id: `${id}-${i}`,
        title,
        roomId,
        date: repeatDate.toISOString(),
        repeat,
        repeatCount,
      });
    }

    const existing = JSON.parse(localStorage.getItem("classes") || "[]");
    const updated = [...existing, ...newClasses];
    localStorage.setItem("classes", JSON.stringify(updated));
    // onCreate(newClasses[newClasses.length - 1]);

    // ✅ STEP 3: navigate to the first class directly
    navigate(`/`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        className="w-full border px-3 py-2 rounded"
        placeholder="Class title (e.g., React Basics)"
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
        <label className="block mb-1 font-medium">Repeat</label>
        <select
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="none">None (once)</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {repeat !== "none" && (
        <div>
          <label className="block mb-1 font-medium">Repeat Count</label>
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}
