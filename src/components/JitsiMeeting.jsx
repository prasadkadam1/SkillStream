import { useEffect } from "react";

export default function JitsiMeeting({ roomId, displayName }) {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomId,
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
      configOverwrite: { startWithAudioMuted: false },
      userInfo: { displayName },
    };

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI(domain, options);
      return () => api.dispose();
    };
    document.body.appendChild(script);
  }, [roomId, displayName]);

  return <div id="jitsi-container" className="w-full rounded overflow-hidden" />;
}