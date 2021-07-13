import { Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Container, Button, Text } from "../../../../../styled";
import { ExamContextConsumer } from "../../context";

const RightPanel = () => {
  const { currentExam } = useSelector((state) => state.exam);
  const { setCount, count, answer } = ExamContextConsumer();
  const { questions } = currentExam;
  const getColor = (idx) => {
    if (idx === count) return "#ff5c33";
    else if (
      answer.answers.find(
        (ans) => String(ans.questionid) === String(questions[idx]._id)
      )
    )
      return "#1a75ff";
  };
  return (
    <Paper style={{ height: "80vh", width: "30vw", margin: "10px" }}>
      <Container justify="center" borderBottom="2px solid rgba(0, 0, 0, 0.25)">
        <Text size="18px" weight="bold">
          Progess Tracker
        </Text>
      </Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto auto auto auto",
          padding: "20px",
          maxHeight: "200px",
          borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
          overflow: "auto",
        }}
      >
        {[...Array(questions.length).keys()].map((v) => (
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background={getColor(v)}
            onClick={() => {
              setCount(v);
            }}
          >
            {v + 1}
          </Button>
        ))}
      </div>
      <Container
        borderBottom="2px solid rgba(0, 0, 0, 0.25)"
        direction="column"
      >
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background="#ff5c33"
          ></Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Current Question
          </Text>
        </Container>
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background="#1a75ff"
          ></Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Attempted Question
          </Text>
        </Container>
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
          ></Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Unattempted Question
          </Text>
        </Container>
      </Container>
    </Paper>
  );
};

export default RightPanel;
