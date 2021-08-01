import React from "react";
import { Container, Text, Button } from "../../../styled";
import HeaderFooter from "../../headerfooter";
import { ExamContextConsumer } from "./context";
import { setErrorAlert } from "../../../redux/actions/alert";
import { useDispatch } from "react-redux";

const InstructionScreen = () => {
  const {
    answer,
    agree,
    setAgree,
    setVideoPermission,
    videoPermission,
    toogleFullscreen,
  } = ExamContextConsumer();
  const dispatch = useDispatch();

  return (
    <HeaderFooter>
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
              videoPermission && agree && answer && toogleFullscreen();
            }}
          >
            Start
          </Button>
          <Button
            width="230px"
            height="30px"
            margin="10px 0 0 10px"
            onClick={() => {
              agree
                ? setVideoPermission(!videoPermission)
                : dispatch(setErrorAlert("Agree to the conditions first"));
            }}
          >
            Test and Allow Audio and Video
          </Button>
        </Container>
      </Container>
    </HeaderFooter>
  );
};

export default InstructionScreen;
