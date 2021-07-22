import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { Container, Text, Button } from "../../../../../styled";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import { exitAnswer } from "../../../../../redux/actions/exam";
import { ExamContextConsumer } from "../../context";
import history from "../../../../../utils/createHistory";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItem: "center",
    width: "100%",
    height: "70px",
  },
};
const Header = () => {
  const { currentExam } = useSelector((state) => state.exam);
  const { exitExam, handle } = ExamContextConsumer();

  useEffect(() => {
    window.addEventListener("blur", pause);
    window.addEventListener("focus", play);
  }, [handle]);
  var timer = null;

  function pause() {
    console.log("not focused");
    // timer = setTimeout(() => {
    //   exitExam("Malpractice");
    // }, 10000);
    // if (handle && handle.active) {
    //   handle.exit();
    // }
  }

  function play() {
    clearTimeout(timer);
    console.log("focused");
  }

  return (
    <Paper style={styles.paper}>
      <Container align="center" justify="center" flex={0.1}>
        <Text lineHeight="0px" weight="bold">
          {currentExam.examtitle}
        </Text>
      </Container>
      <Container align="center" flex={0.6}>
        <Text lineHeight="15px">{currentExam.examinfo}</Text>
      </Container>
      <Container align="center" justify="center" flex={0.1} padding="20px 0px">
        <Timer start={currentExam.startingtime} end={currentExam.endingtime} />
      </Container>
      <Container align="center" flex={0.2} justify="center">
        <Text lineHeight="0px">
          <Button
            background="#DE4839"
            height="40px"
            size="15px"
            weight="bold"
            onClick={() => {
              exitExam("Submitted");
            }}
          >
            Submit & Exit
          </Button>
        </Text>
      </Container>
    </Paper>
  );
};

export default Header;
