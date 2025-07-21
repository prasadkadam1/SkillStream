import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("classes") || "[]");
    const mapped = data.map((cls) => ({
      title: cls.title,
      date: cls.date,
      id: cls.id,
      url: `/join/${cls.roomId}`,
    }));
    setEvents(mapped);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Class Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          navigate(info.event.url);
        }}
      />
    </div>
  );
}
