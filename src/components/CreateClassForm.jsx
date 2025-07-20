import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateClassForm() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = Date.now().toString();
    const roomId = title.toLowerCase().replace(/\s+/g, "-") + "-" + id;
    const newClass = { id, title, roomId, date: new Date().toLocaleString() };

    const existing = JSON.parse(localStorage.getItem("classes") || "[]");
    localStorage.setItem("classes", JSON.stringify([...existing, newClass]));

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Class title (e.g., JavaScript Basics)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}
