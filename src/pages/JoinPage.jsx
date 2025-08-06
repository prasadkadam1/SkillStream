import { useParams } from "react-router-dom";

export default function JoinPage() {
  const { roomId } = useParams();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">🎥 Join Class</h2>
        <p className="text-gray-600 mb-4">Room ID:</p>
        <code className="bg-gray-200 px-4 py-2 rounded text-blue-800 font-mono">
          {roomId}
        </code>
        <p className="mt-4 text-sm text-gray-500">Live meeting UI coming soon...</p>
      </div>
    </div>
  );
}
