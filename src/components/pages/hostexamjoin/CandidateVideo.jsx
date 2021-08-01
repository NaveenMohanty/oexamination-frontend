import React, { useEffect, useRef, useState } from "react";
import { Paper } from "@material-ui/core";
import { Container, Text, Button, Input } from "../../../styled";
import DialogBox from "../../materialui/DialogBox";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import IconButtons from "../../materialui/IconButtons";
import MessageTwoToneIcon from "@material-ui/icons/MessageTwoTone";

const CandidateVideo = ({ peer }) => {
  const userVideo = useRef();
  const warn = useRef(0);
  const [warningLevel, setWarningLevel] = useState(0);
  const [open, setOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);

  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      // vdoVideo.current.srcObject = stream;
    });

    peer.peer.on("data", (data) => {
      warn.current = parseInt(data);
      setWarningLevel(warn.current);
    });
  }, []);

  useEffect(() => {
    if (peer.warn) {
      warn.current = parseInt(peer.warn);
      setWarningLevel(warn.current);
    }
  }, [peer]);

  return (
    <Paper
      style={{
        position: "relative",
        width: "22%",
        minWidth: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        margin: "10px",
        backgroundColor:
          warningLevel > 0
            ? `rgb(245, ${221 - warningLevel * 20}, 66)`
            : "white",
      }}
    >
      <div>
        <p
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            color: "white",
            padding: "10px",
            lineHeight: "0px",
            backgroundColor: "rgb(15, 15, 15,0.7)",
            fontSize: "12px",
          }}
        >
          {peer.user.user.name}
        </p>
        <video
          id={peer.user.user._id}
          name={peer.user.user._id}
          ref={userVideo}
          style={{ minWidth: "100px", width: "100%" }}
          muted
          autoPlay
          playsInline
          controls
        />
      </div>
      <Container direction="row" align="center" justify="space-between">
        <Text padding="2px" background="white">
          Malpractice Time: {warningLevel * 10 + " "}sec
        </Text>
        <WarningMsgDialog
          open={msgOpen}
          setOpen={setMsgOpen}
          send={(props) => {
            try {
              if (props.msg) peer.peer.send(props.msg);
            } catch (error) {
              console.warn("ERROR:", error);
            }
          }}
        />
        <TerminateDialog
          open={open}
          setOpen={setOpen}
          name={peer.user.user.name}
          termiante={() => {
            try {
              peer.peer.send("TERMINATE");
            } catch (error) {
              console.warn("ERROR:", error);
            }
          }}
        />
      </Container>
    </Paper>
  );
};

export default CandidateVideo;

const TerminateDialog = ({ open, setOpen, name, termiante }) => {
  return (
    <DialogBox
      open={open}
      setOpen={setOpen}
      title="Alert"
      buttons={[
        { onClick: () => termiante(), name: "Yes" },
        { onClick: () => setOpen(false), name: "No" },
      ]}
      MainButton={(props) => (
        <IconButtons onClick={props.onClick} tooltipTitle="Terminate Exam">
          <CancelTwoToneIcon />
        </IconButtons>
      )}
    >
      <Text>
        Do you want to <b>TERMINATE</b> {name}'s Exam
      </Text>
    </DialogBox>
  );
};

const WarningMsgDialog = ({ open, setOpen, send }) => {
  const [input, setInput] = useState("");
  return (
    <DialogBox
      open={open}
      setOpen={setOpen}
      title="Alert Message"
      buttons={[
        {
          onClick: () => {
            send({ msg: input });
            setInput("");
          },
          name: "send",
        },
        { onClick: () => setOpen(false), name: "cancel" },
      ]}
      MainButton={(props) => (
        <IconButtons onClick={props.onClick} tooltipTitle="Send Alert Message">
          <MessageTwoToneIcon />
        </IconButtons>
      )}
    >
      <textarea
        style={{
          background: "#EDF8DF",
          border: "1px solid #000000",
          boxSizing: "border-box",
          borderRadius: "2px",
          padding: "5px",
          width: "30vw",
          height: "70px",
        }}
        placeholder="Write Message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      ></textarea>
    </DialogBox>
  );
};
