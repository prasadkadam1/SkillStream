import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateClass from "./pages/CreateClass";
import JoinClass from "./pages/JoinClass";
import CalendarPage from "./pages/Calendar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
        <h1 className="font-bold text-lg">SkillStream</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/create">Create Class</Link>
          {/* <Link to="/calendar">Calendar</Link> */}
          <Link to="/calendar">Calendar</Link>
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateClass />} />
          <Route path="/join/:roomId" element={<JoinClass />} />
          {/* <Route path="/calendar" element={<CalendarPage />} /> */}
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </main>
    </div>
  );
}
