import React, { useState, useEffect } from "react";
import { Container, Text, Button } from "../../../styled";
import HeaderFooter from "../../headerfooter";
import { ExamContextConsumer } from "./context";
import IconButtons from "../../materialui/IconButtons";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import history from "../../../utils/createHistory";

const InstructionScreen = () => {
  const {
    answer,
    agree,
    setAgree,
    handle,
    setVideoPermission,
    videoPermission,
    toogleFullscreen,
  } = ExamContextConsumer();

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
            <li>
              On clicking the "Start" button, you will enter the FullScreen mode
              of the exam.
            </li>
            <li>
              You can exit the exam by clicking on the "Submit & Exit" button at
              the top-right.
            </li>
            <li>
              If you leave the exam tab or exit full-screen you will be
              terminated from the exam.
            </li>
            <li>Once Exited from the exam, you cannot enter the exam again.</li>
            <li>
              The answer once responded will be registered as attempted, further
              it can be changed only.
            </li>
            <li>
              When exam time is over, your answers will get be automatically
              submitted.
            </li>
            <li>
              You can track your progress from the progress tracker on the right
              section of the exam page.
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
            I have read the instruction and permit to track my computer activity
            during the exam.
          </label>
        </label>
        <Container justify="center">
          <Button
            width="80px"
            height="30px"
            margin="10px 10px 0 0"
            background="#D31A50"
            onClick={() => {
              // videoPermission && agree && answer && handle.enter();
              agree && answer && toogleFullscreen();
            }}
          >
            Start
          </Button>
          {/* <Button
            width="230px"
            height="30px"
            margin="10px 0 0 10px"
            onClick={() => setVideoPermission(true)}
          >
            Test and Allow Audio and Video
          </Button> */}
        </Container>
      </Container>
    </HeaderFooter>
  );
};

export default InstructionScreen;
