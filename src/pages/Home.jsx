import { useState, useEffect } from "react";
import ClassList from "../components/ClassList";

export default function Home() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("classes") || "[]");
    setClasses(stored);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      classes.forEach((cls) => {
        const classTime = new Date(cls.date).getTime();
        const diff = classTime - now;

        if (diff > 0 && diff < 5 * 60 * 1000 && !cls.alerted) {
          alert(`⏰ Upcoming class: "${cls.title}" starts in 5 minutes!`);
          // mark as alerted
          cls.alerted = true;
          const updated = [...classes];
          setClasses(updated);
          localStorage.setItem("classes", JSON.stringify(updated));
        }
      });
    }, 60000); // check every 1 minute

    return () => clearInterval(interval);
  }, [classes]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      <ClassList classes={classes} setClasses={setClasses} />
    </div>
  );
}
