import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Peer from "simple-peer";
import { getUser } from "../../../utils/localStorage";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
const AudioVideo = ({ active }) => {
  const { currentExam } = useSelector((state) => state.exam);
  const socketRef = useRef();
  const userVideo = useRef();
  const currentPeer = useRef();
  useEffect(() => {
    socketRef.current = io.connect(String(process.env.REACT_APP_SOCKET_URL));
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        let user = getUser().user;
        user.type = "candidate";
        socketRef.current.emit("join_room", {
          user,
          examid: currentExam._id,
        });
        socketRef.current.emit("new_join");

        socketRef.current.once("receive_signal", async (payload) => {
          console.log("receive_signal", payload);

          currentPeer.current = await callReceiver(
            payload.to,
            payload.from,
            JSON.parse(payload.signal),
            stream
          );
        });
      });
    return () => {
      socketRef.current.disconnect();
    };
  }, [currentExam]);

  const callReceiver = async (to, from, signal, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    let prom = new Promise((resolve, reject) => {
      peer.on("signal", (signal) => {
        resolve(signal);
      });
    });
    socketRef.current.emit("send_signal", {
      to: from,
      from: to,
      signal: JSON.stringify(await Promise.all([prom])),
    });
    peer.signal(signal);

    return peer;
  };

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
