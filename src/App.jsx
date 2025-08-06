import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateClass from "./pages/CreateClass";
import CalendarPage from "./pages/CalendarPage";
import JoinPage from "./pages/JoinPage";
import JoinClass from './pages/JoinClass'; // make this component
import ClassDetails from "./pages/ClassDetails";
import EditClass from "./pages/EditClass";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateClass />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/class/:id" element={<ClassDetails />} />
        <Route path="/edit/:id" element={<EditClass />} />
      </Route>
        <Route path="/join/:roomId" element={<JoinClass />} />
      {/* <Route path="/join/:roomId" element={<JoinPage />} /> */}
    </Routes>
  );
}

export default App;
