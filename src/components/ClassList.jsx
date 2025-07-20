import { Link } from "react-router-dom";

export default function ClassList({ classes }) {
  if (!classes.length) return <p>No classes found. Create one!</p>;

  return (
    <ul className="space-y-4">
      {classes.map((cls) => (
        <li
          key={cls.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold text-lg">{cls.title}</h3>
            <p className="text-sm text-gray-600">Scheduled: {cls.date}</p>
          </div>
          <Link
            to={`/join/${cls.roomId}`}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Join
          </Link>
        </li>
      ))}
    </ul>
  );
}
