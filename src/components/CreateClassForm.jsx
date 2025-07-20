import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateClassForm() {
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const id = Date.now().toString();
    const roomId = title.toLowerCase().replace(/\s+/g, "-") + "-" + id;

    const newClass = {
      id,
      title,
      roomId,
      date: new Date().toISOString(), // ISO format is easier to sort
    };

    const existing = JSON.parse(localStorage.getItem("classes") || "[]");
    localStorage.setItem("classes", JSON.stringify([...existing, newClass]));

    const fullLink = `${window.location.origin}/join/${roomId}`;
    setLink(fullLink);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          className="w-full border px-3 py-2 rounded"
          placeholder="Class title (e.g., React Basics)"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>

      {link && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <p className="mb-2 font-medium">Class created successfully! 🎉</p>
          <p className="text-sm">Share this link to join:</p>
          <a
            href={link}
            className="text-blue-700 break-all underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
