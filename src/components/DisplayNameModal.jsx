import { useState } from "react";

export default function DisplayNameModal({ onConfirm }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-3">Enter Display Name</h2>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., John"
        />
        <button
          onClick={() => onConfirm(name)}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
}
