import React, { useEffect, useRef } from "react";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
const AudioVideo = ({ active }) => {
  const userVideo = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
      });
  });
  return (
    <video
      style={{
        position: "absolute",
        bottom: active ? "80px" : "10px",
        right: active ? "40px" : "10px",
      }}
      ref={userVideo}
      height="150px"
      muted
      autoPlay
      playsInline
    />
  );
};

export default AudioVideo;
