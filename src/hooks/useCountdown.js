import { useEffect, useState } from "react";

export default function useCountdown(targetDateTime) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDateTime);
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("");
        clearInterval(interval);
      } else {
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateTime]);

  return timeLeft;
}
