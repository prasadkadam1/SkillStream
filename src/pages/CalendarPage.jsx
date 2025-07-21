import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Load saved classes from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("classes") || "[]");
    const mapped = stored.map((cls) => ({
      title: cls.title,
      start: new Date(cls.date),
      end: new Date(new Date(cls.date).getTime() + 60 * 60 * 1000),
      roomId: cls.roomId,
    }));
    setEvents(mapped);
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo.start);
  };

  const handleCreate = () => {
    if (!title || !selectedSlot) return;
    const id = Date.now().toString();
    const roomId = title.toLowerCase().replace(/\s+/g, "-") + "-" + id;

    const newClass = {
      id,
      title,
      roomId,
      date: selectedSlot.toISOString(),
    };

    const updated = [
      ...events,
      {
        title,
        start: selectedSlot,
        end: new Date(selectedSlot.getTime() + 60 * 60 * 1000),
        roomId,
      },
    ];

    setEvents(updated);
    setSelectedSlot(null);
    setTitle("");

    const existing = JSON.parse(localStorage.getItem("classes") || "[]");
    localStorage.setItem("classes", JSON.stringify([...existing, newClass]));
  };

  const handleSelectEvent = (event) => {
    navigate(`/join/${event.roomId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📅 Class Calendar</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        views={["week", "day"]}
        defaultView="week"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        step={30}
        timeslots={2}
      />

      {selectedSlot && (
        <div className="bg-white shadow border mt-6 max-w-md p-4 rounded">
          <h3 className="text-lg font-bold mb-2">
            Create Class on: {selectedSlot.toLocaleString()}
          </h3>
          {/* <input
            className="w-full border px-3 py-2 mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter class title"
          /> */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Class Title
            </label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., React Basics"
            />
          </div>
          <div>
            <label htmlFor="" className="block text-sm font-medium mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setSelectedSlot(new Date(e.target.value))}
              value={
                selectedSlot
                  ? new Date(selectedSlot).toISOString().slice(0, 16)
                  : ""
              }
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Schedule Class
          </button>
        </div>
      )}
    </div>
  );
}
