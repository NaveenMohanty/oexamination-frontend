import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../../styled";
import CandidateVideo from "./CandidateVideo";
import { useDispatch, useSelector } from "react-redux";
import { getExam } from "../../../redux/actions/exam";
import io from "socket.io-client";
import Peer from "simple-peer";
import { getUser } from "../../../utils/localStorage";
import { setSuccessAlert, setErrorAlert } from "../../../redux/actions/alert";
import history from "../../../utils/createHistory";

const HostExamJoin = (props) => {
  const dispatch = useDispatch();
  const socketRef = useRef();
  const peersRef = useRef([]);
  const { currentExam } = useSelector((state) => state.exam);
  const [peers, setPeers] = useState([]);
  useEffect(() => {
    dispatch(
      setSuccessAlert(
        "Allow webcam permission to start hosting exam. No one can see your video and audio feed during this exam.",
        10000
      )
    );
    if (!Peer.WEBRTC_SUPPORT) {
      dispatch(
        setErrorAlert(
          "You browser doesn't support video streaming. Try another browser"
        )
      );
    }
    socketRef.current = io.connect(String(process.env.REACT_APP_SOCKET_URL));

    const queryParams = new URLSearchParams(window.location.search);
    const exam_id = queryParams.get("exam_id");
    async function getValue() {
      await dispatch(getExam(exam_id));
      let user = getUser().user;
      user.type = "host";

      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { max: 352 },
            height: { max: 240 },
            frameRate: { ideal: 2, max: 3 },
          },
          audio: true,
        })
        .then((stream) => {
          socketRef.current.emit("join_room", {
            user,
            examid: exam_id,
          });
          socketRef.current.on("user_list", (userList) => {
            let tempPeers = userList.map((user) => {
              return {
                user: user,
                peer: initiateCall(user.socketid, socketRef.current.id, stream),
              };
            });
            peersRef.current = [...tempPeers];
            setPeers([...tempPeers]);
          });

          socketRef.current.on("user_joined", (payload) => {
            const peer = initiateCall(
              payload.socketid,
              socketRef.current.id,
              stream
            );
            peersRef.current.push({ user: payload, peer });
            setPeers([...peers, { user: payload, peer }]);
          });

          socketRef.current.on("receiving_returned_signal", (payload) => {
            const item = peersRef.current.find(
              (p) => String(p.user.socketid) === String(payload.from)
            );
            setPeers(() =>
              peersRef.current.map((p) => {
                if (String(p.user.socketid) === String(payload.from)) {
                  return { ...p, warn: payload.warn };
                } else {
                  return { ...p };
                }
              })
            );
            item.peer.signal(JSON.parse(payload.signal));
          });
          socketRef.current.on("user_left", (socketid) => {
            let arr = peersRef.current.filter(
              (peer) => String(peer.user.socketid) !== String(socketid)
            );
            peersRef.current = arr;
            setPeers([...arr]);
          });
        })
        .catch((err) => {
          dispatch(setErrorAlert(err.message));
          history.goBack();
        });
    }
    getValue();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const initiateCall = (to, from, stream) => {
    const peer = new Peer({
      initiator: true,
      config: {
        iceServers: [
          {
            url: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
        ],
      },
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending_signal", {
        to,
        from,
        signal: JSON.stringify(signal),
      });
    });

    return peer;
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {peers.map((peer, idx) => (
        <CandidateVideo peer={peer} key={idx} />
      ))}
    </div>
  );
};

export default HostExamJoin;
