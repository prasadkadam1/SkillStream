import { useParams } from "react-router-dom";
import JitsiMeeting from "../components/JitsiMeeting";

export default function JoinClass() {
  const { roomId } = useParams();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Joining: {roomId}</h2>
      <JitsiMeeting roomId={roomId} />
    </div>
  );
}
