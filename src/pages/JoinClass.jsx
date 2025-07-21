import { useParams } from "react-router-dom";
import JitsiMeeting from "../components/JitsiMeeting";
import { useEffect, useState } from "react";

export default function JoinClass() {
  const { roomId } = useParams();
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("classes") || "[]");
    const thisClass = data.find((cls) => cls.roomId === roomId);

    if (thisClass) {
      const classTime = new Date(thisClass.date);
      const interval = setInterval(() => {
        const diff = classTime - new Date();
        if (diff <= 0) {
          setCountdown("It's time! 🎉");
          clearInterval(interval);
        } else {
          const mins = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setCountdown(`${mins}m ${secs}s left`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [roomId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Joining: {roomId}</h2>
      <JitsiMeeting roomId={roomId} />
    </div>
  );
}
