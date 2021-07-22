import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../../styled";
import CandidateVideo from "./CandidateVideo";
import { useDispatch, useSelector } from "react-redux";
import { getExam } from "../../../redux/actions/exam";
import io from "socket.io-client";
import Peer from "simple-peer";
import { getUser } from "../../../utils/localStorage";

const HostExamJoin = () => {
  const dispatch = useDispatch();
  const socketRef = useRef();
  const peersRef = useRef([]);
  const { currentExam } = useSelector((state) => state.exam);
  const [peers, setPeers] = useState([]);
  useEffect(() => {
    socketRef.current = io.connect(String(process.env.REACT_APP_SOCKET_URL));

    const queryParams = new URLSearchParams(window.location.search);
    const exam_id = queryParams.get("exam_id");
    async function getValue() {
      await dispatch(getExam(exam_id));
      let user = getUser().user;
      user.type = "host";
      socketRef.current.emit("join_room", {
        user,
        examid: currentExam._id,
      });

      socketRef.current.on("user_list", (userList) => {
        let tempPeers = userList.map((user) => {
          return {
            user: user,
            peer: initiateCall(user.socketid, socketRef.current.id),
          };
        });
        peersRef.current = tempPeers;
        setPeers([...tempPeers]);
      });

      socketRef.current.on("user_joined", (payload) => {
        console.log("user_joined");
        const peer = initiateCall(payload.socketid, socketRef.current.id);
        peersRef.current.push({ user: payload, peer });
        setPeers([...peers, { user: payload, peer }]);
      });

      socketRef.current.on("receiving_returned_signal", (payload) => {
        console.log(payload, "receiving_returned_signal");
        const item = peersRef.current.find(
          (p) => String(p.user.socketid) === String(payload.from)
        );

        item.peer.signal(JSON.parse(payload.signal));
      });
      socketRef.current.on("user_left", (socketid) => {
        console.log("user_left", socketid);
        let arr = peersRef.current.filter(
          (peer) => String(peer.user.socketid) !== String(socketid)
        );
        peersRef.current = arr;
        setPeers([...arr]);
      });
    }
    getValue();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const initiateCall = (to, from) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
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
    <div>
      {peers.map((peer, idx) => (
        <CandidateVideo peer={peer} key={idx} />
      ))}
    </div>
  );
};

export default HostExamJoin;
