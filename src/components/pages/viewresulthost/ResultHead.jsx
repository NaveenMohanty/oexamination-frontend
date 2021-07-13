import { Paper } from "@material-ui/core";
import React from "react";
import { Container, Text } from "../../../styled";
import { useSelector } from "react-redux";

const ResultHead = () => {
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

  return (
    <Paper
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <Text size="18px" weight="bold" lineHeight="0px">
        {currentExam.examtitle}
      </Text>
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
      </Container>
    </Paper>
  );
};

export default ResultHead;
