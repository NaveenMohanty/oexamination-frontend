import { Paper } from "@material-ui/core";
import React from "react";
import { Button, Container } from "../../../../../styled";
import Question from "./Question";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useSelector } from "react-redux";
import { ExamContextConsumer } from "../../context";

const LeftPanel = () => {
  const { currentExam } = useSelector((state) => state.exam);
  const { count, setCount } = ExamContextConsumer();
  const onNext = () => {
    if (count + 1 < currentExam.questions.length) setCount(count + 1);
  };
  const onPrev = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <Paper style={{ height: "", margin: "10px" }}>
      <Question
        question={currentExam.questions[count]}
        examid={currentExam._id}
      />
      <Container
        borderTop="2px solid rgba(0, 0, 0, 0.25)"
        justify="space-between"
        position="absolute"
        height="60px"
        width="66.7vw"
        bottom="0px"
      >
        <Button
          width="100px"
          height="35px"
          background="none"
          color="black"
          margin="8px"
          onClick={onPrev}
        >
          <Container align="center" justify="center">
            <ArrowBackIosIcon /> Previous
          </Container>
        </Button>
        <Button
          width="100px"
          height="35px"
          background="none"
          color="black"
          margin="8px"
          onClick={onNext}
        >
          <Container align="center" justify="center">
            Next <ArrowForwardIosIcon />
          </Container>
        </Button>
      </Container>
    </Paper>
  );
};

export default LeftPanel;
