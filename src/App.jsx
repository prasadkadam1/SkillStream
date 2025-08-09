import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard"; // ✅ Updated: was 'Home' earlier
import CreateClass from "./pages/CreateClass";
import CalendarPage from "./pages/CalendarPage";
import JoinClass from './pages/JoinClass';
import ClassDetails from "./pages/ClassDetails";
import CreateClassForm from "./components/CreateClassForm";
import EditClassModal from "./components/EditClassModal";

function App() {
  return (
    <Routes>
      {/* Routes inside the layout shell */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} /> {/* ✅ Changed */}
        <Route path="/create" element={<CreateClassForm />} />
        {/* <Route path="/create" element={<CreateClass />} /> */}
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/class/:id" element={<ClassDetails />} />
        {/* <Route path="/edit/:id" element={<EditClass />} /> */}
        <Route path="/edit/:id" element={<EditClassModal />} />
      </Route>

      {/* Standalone route (outside layout shell) */}
      <Route path="/join/:roomId" element={<JoinClass />} />
    </Routes>
  );
}

export default App;
