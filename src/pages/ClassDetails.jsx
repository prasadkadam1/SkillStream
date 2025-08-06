import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);

  useEffect(() => {
    const allClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const found = allClasses.find(c => c.id === id);
    setCls(found);
  }, [id]);

  if (!cls) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Class not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{cls.title}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Description:</strong> {cls.description || "N/A"}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Room ID:</strong> {cls.roomId}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {new Date(cls.date).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Recurrence:</strong> {cls.recurrence || "None"}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Created by:</strong> {cls.createdBy || "Unknown"}
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>

        <a
          href={`/join/${cls.roomId}`}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Join Class
        </a>
      </div>
    </div>
  );
}
