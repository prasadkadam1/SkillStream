import { useState } from "react";
import { Link } from "react-router-dom";
import EditClassModal from "./EditClassModal";

export default function ClassList({ classes, setClasses }) {
  const [editClass, setEditClass] = useState(null);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this class?");
    if (!confirm) return;
    const updated = classes.filter((cls) => cls.id !== id);
    setClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));
  };

  const handleUpdate = (updatedClass) => {
    const updated = classes.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls));
    setClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));
  };

  return (
    <>
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="bg-white p-4 rounded shadow flex justify-between items-center flex-wrap gap-3">
            <div>
              <p className="font-bold">{cls.title}</p>
              <p className="text-sm text-gray-500">{new Date(cls.date).toLocaleString()}</p>
              {cls.recurrence && cls.recurrence !== "none" && (
                <p className="text-xs text-blue-500">Repeats: {cls.recurrence}</p>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to={`/join/${cls.roomId}`} className="bg-green-600 text-white px-3 py-1 rounded">Join</Link>
              <button onClick={() => setEditClass(cls)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(cls.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editClass && (
        <EditClassModal
          cls={editClass}
          onClose={() => setEditClass(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}