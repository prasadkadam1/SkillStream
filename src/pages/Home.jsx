// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { CalendarDays, Video, Repeat } from "lucide-react";

// export default function Home() {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("classes") || "[]");
//     setClasses(saved.slice(0, 10)); // limit to latest 10 for now
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-blue-800 mb-6">Upcoming Classes</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {classes.length === 0 ? (
//           <p className="text-gray-500">No classes found. Click "New Class" to create one!</p>
//         ) : (
//           classes.map((cls) => (
//             <div
//               key={cls.id}
//               className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
//                   <Video className="w-5 h-5 text-blue-500" />
//                   {cls.title}
//                 </h3>
//               </div>

//               <p className="text-sm text-gray-600 flex items-center gap-2">
//                 <CalendarDays className="w-4 h-4 text-gray-400" />
//                 {new Date(cls.date).toLocaleString()}
//               </p>

//               <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
//                 <Repeat className="w-4 h-4 text-gray-400" />
//                 Recurs: {cls.repeat || "None"}
//               </p>

//               <Link
//                 to={`/join/${cls.roomId}`}
//                 className="mt-4 inline-block text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
//               >
//                 Join Class
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Video, CalendarClock, Clock3 } from "lucide-react";

export default function Home() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("classes") || "[]");
    const sorted = saved.sort((a, b) => new Date(a.date) - new Date(b.date));
    setClasses(sorted);
  }, []);
const handleDelete = (id) => {
  const confirm = window.confirm("Are you sure you want to delete this class?");
  if (!confirm) return;

  const all = JSON.parse(localStorage.getItem("classes") || "[]");
  const updated = all.filter(c => c.id !== id);
  localStorage.setItem("classes", JSON.stringify(updated));
  setClasses(updated);
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
        📚 Scheduled Classes
      </h1>
 <button>click</button>
      {classes.length === 0 ? (
        <p className="text-center text-gray-500">
          No classes available. Create your first class now!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const classTime = new Date(cls.date).toLocaleString();
            const isToday =
              new Date(cls.date).toDateString() === new Date().toDateString();

            return (
              <div
                key={cls.id}
                className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Video className="text-blue-600 w-5 h-5" />
                  <h3 className="text-lg font-semibold text-blue-900">
                    {cls.title}
                  </h3>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <CalendarClock className="w-4 h-4" />
                  {classTime}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  Recurrence:{" "}
                  <span className="capitalize">{cls.repeat || "none"}</span>
                </div>

                {isToday && (
                  <span className="inline-block mt-3 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">
                    📅 Today’s Class
                  </span>
                )}

                <Link
                  to={`/join/${cls.roomId}`}
                  className="block mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
                >
                  Join Class
                </Link>
                <Link
                  to={`/class/${cls.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${cls.id}`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(cls.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
