import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    recurrence: "",
  });

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("classes") || "[]");
    const found = all.find(c => c.id === id);
    if (found) {
      setCls(found);
      setForm({
        title: found.title,
        description: found.description || "",
        date: found.date,
        recurrence: found.recurrence || "",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("classes") || "[]");
    const updated = all.map(c =>
      c.id === id ? { ...c, ...form } : c
    );
    localStorage.setItem("classes", JSON.stringify(updated));
    navigate("/");
  };

  if (!cls) {
    return <div className="p-4 text-red-500">Class not found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="recurrence"
          value={form.recurrence}
          onChange={handleChange}
          placeholder="Recurrence"
          className="w-full px-3 py-2 border rounded"
        />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
