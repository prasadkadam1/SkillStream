// import { useEffect } from "react";

// export default function JitsiMeeting({ roomId, displayName }) {
//   useEffect(() => {
//     const domain = "meet.jit.si";
//     const options = {
//       roomName: roomId,
//       width: "100%",
//       height: 600,
//       parentNode: document.getElementById("jitsi-container"),
//       configOverwrite: { startWithAudioMuted: false },
//       userInfo: { displayName },
//     };

//     const script = document.createElement("script");
//     script.src = "https://meet.jit.si/external_api.js";
//     script.async = true;
//     script.onload = () => {
//       const api = new window.JitsiMeetExternalAPI(domain, options);
//       return () => api.dispose();
//     };
//     document.body.appendChild(script);
//   }, [roomId, displayName]);

//   return <div id="jitsi-container" className="w-full rounded overflow-hidden" />;
// }/



import { useEffect } from "react";

export default function JitsiMeeting({ roomId, displayName = "Guest" }) {
  useEffect(() => {
    let api = null;
    const domain = "meet.jit.si";

    const loadMeeting = () => {
      const options = {
        roomName: roomId,
        width: "100%",
        height: 600,
        parentNode: document.getElementById("jitsi-container"),
        configOverwrite: { startWithAudioMuted: false },
        userInfo: { displayName },
      };

      api = new window.JitsiMeetExternalAPI(domain, options);
    };

    // Check if the Jitsi script is already loaded
    if (window.JitsiMeetExternalAPI) {
      loadMeeting();
    } else {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = () => loadMeeting();
      document.body.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [roomId, displayName]);

  return (
    <div>
      <div className="text-lg font-semibold mb-2">Live Class: {roomId}</div>
      <div id="jitsi-container" className="w-full rounded overflow-hidden border shadow" />
    </div>
  );
}
