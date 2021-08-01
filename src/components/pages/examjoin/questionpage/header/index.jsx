import React from "react";
import { Paper } from "@material-ui/core";
import { Container, Text, Button } from "../../../../../styled";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import { ExamContextConsumer } from "../../context";

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
  const { exitExam } = ExamContextConsumer();

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
