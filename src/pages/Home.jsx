import { useEffect, useState } from "react";
import ClassList from "../components/ClassList";

export default function Home() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("classes") || "[]");
    setClasses(data);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upcoming Live Classes</h2>
      <ClassList classes={classes} />
    </div>
  );
}
