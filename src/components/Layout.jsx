import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home, PlusCircle, Calendar, Video } from "lucide-react";

export default function Layout() {
  let navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r flex flex-col p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          📘 SkillsStream
        </h1>

        <nav className="space-y-4">
          <SidebarLink icon={<Home />} text="Dashboard" to="/" />
          <SidebarLink icon={<PlusCircle />} text="New Class" to="/create" />
          <SidebarLink icon={<Calendar />} text="Calendar" to="/calendar" />
        </nav>

        <div className="mt-auto text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SkillsStream
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
          <button
            onClick={() => navigate("/create")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Create Class
          </button>

          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="text-sm text-gray-500">👋 Hello, Prasad!</div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
    >
      {icon}
      {text}
    </Link>
  );
}
