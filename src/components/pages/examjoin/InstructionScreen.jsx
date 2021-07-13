import React, { useState, useEffect } from "react";
import { Container, Text, Button } from "../../../styled";
import HeaderFooter from "../../headerfooter";
import { ExamContextConsumer } from "./context";
import IconButtons from "../../materialui/IconButtons";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import history from "../../../utils/createHistory";

const InstructionScreen = ({ handle, setVideoPermission, videoPermission }) => {
  const [agree, setAgree] = useState(false);
  const { answer, exitExam } = ExamContextConsumer();

  return (
    <HeaderFooter>
      <IconButtons
        width="50px"
        height="30px"
        color="black"
        tooltipTitle="Back"
        tooltipPlacement="right"
        onClick={() => {
          history.push("/host");
        }}
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </IconButtons>
      <Container padding="auto" align="center" direction="column">
        <label>
          <Text size="24px" lineHeight="2px" weight="bold">
            Instruction:
          </Text>
          <ol style={{ fontSize: "22px" }}>
            <li>Click on the allow button to give permission for webcam.</li>
            <li>On start of exam the screen will become full screen.</li>
            <li>Do not open other tab or other application during exam.</li>
            <li>
              If found doing any of such activity exam will get terminated.
            </li>
            <li>Examiner will see live footage of your audio and video.</li>
            <li>
              Examiner can terminate your exam if found any malpractice activity
              during exam.
            </li>
          </ol>
          <label for="instruction" style={{ fontSize: "22px", color: "red" }}>
            <input
              type="checkbox"
              id="instruction"
              name="instruction"
              checked={agree}
              onChange={() => {
                setAgree(!agree);
              }}
            ></input>
            I have read the instruction and have given permission for audio and
            video to my browser
          </label>
        </label>
        <Container justify="center">
          <Button
            width="80px"
            height="30px"
            margin="10px 10px 0 0"
            background="#D31A50"
            onClick={() => {
              videoPermission && agree && answer && handle.enter();
            }}
          >
            Start
          </Button>
          <Button
            width="230px"
            height="30px"
            margin="10px 0 0 10px"
            onClick={() => setVideoPermission(true)}
          >
            Test and Allow Audio and Video
          </Button>
        </Container>
      </Container>
    </HeaderFooter>
  );
};

export default InstructionScreen;
