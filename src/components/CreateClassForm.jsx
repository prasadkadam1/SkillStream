import React from "react";
import { useNavigate } from "react-router-dom";

const CreateClassForm = () => {
  const navigate = useNavigate();
  console.log("form loaded");

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const date = e.target.date.value;
    const duration = e.target.duration.value;

    const id = Date.now();
    const roomId = `${title.toLowerCase().replace(/\s+/g, "-")}-${id}`;

    const newClass = {
      id,
      title,
      description,
      date,
      duration,
      roomId,
    };

    const existing = JSON.parse(localStorage.getItem("classes") || "[]");
    const updated = [...existing, newClass];
    localStorage.setItem("classes", JSON.stringify(updated));

    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create a New Class
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            required
            placeholder="e.g. 1 hr"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-lg text-lg font-semibold shadow-md"
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClassForm;
