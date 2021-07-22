import React, { useEffect, useRef } from "react";

const CandidateVideo = ({ peer }) => {
  const userVideo = useRef();

  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
  }, []);

  return (
    <>
      <label id={peer.user.user._id} name={peer.user.user._id}>
        {peer.user.user.name}

        <video
          id={peer.user.user._id}
          name={peer.user.user._id}
          style={{ padding: "10px", height: "23vh" }}
          ref={userVideo}
          height="150px"
          muted
          autoPlay
          playsInline
        />
      </label>
    </>
  );
};

export default CandidateVideo;
