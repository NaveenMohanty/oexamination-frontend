import { Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Container, Text } from "../../../styled";

const ResultHead = ({ answer }) => {
  const { currentExam } = useSelector((state) => state.exam);

  const timeConverter = (date = Date()) => {
    var D = new Date(date);
    let dateString = `${D.toLocaleDateString()} ${D.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
    return dateString;
  };

  const totalExamMark = () => {
    let questions = currentExam.questions || [];
    let totalMark = 0;
    questions.map((question) => {
      totalMark += question.mark;
    });
    return totalMark;
  };

  return (
    <Paper
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 30px",
      }}
    >
      <Container direction="row" justify="space-between">
        <Text size="18px">
          <b>Exam Name: </b>
          {currentExam.examtitle}
        </Text>
        {answer.exited === "Malpractice" && (
          <Text size="18px" color="red">
            *Malpractice Warning
          </Text>
        )}
        <Text size="18px">
          <b>Candidate Name: </b>
          {answer && answer.candidateid && answer.candidateid.name
            ? answer.candidateid.name
            : ""}
        </Text>
      </Container>
      <Text size="15px" lineHeight="0px">
        {currentExam.examinfo}
      </Text>
      <Container direction="row" justify="space-between">
        <Text>
          <b>Start: </b>
          {timeConverter(currentExam.startingtime)}
        </Text>
        <Text>
          <b>End: </b>
          {timeConverter(currentExam.endingtime)}
        </Text>
        <Text size="18" color="red">
          <b>Mark: </b>
          {answer.exited === "Malpractice" ? "0" : answer.totalmark}/
          {totalExamMark()}
        </Text>
      </Container>
    </Paper>
  );
};

export default ResultHead;
