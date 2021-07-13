import { Paper } from "@material-ui/core";
import React from "react";
import { Text, Button } from "../../../styled";
import history from "../../../utils/createHistory";

const ResultBar = ({ answer, totalExamMark, examid }) => {
  return (
    <Paper
      style={{
        width: "50%",
        margin: "2px 0px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
      }}
    >
      <Text size="16px">{answer.candidateid.name}</Text>
      <Text color={answer.exited === "Malpractice" ? "red" : "black"}>
        <b>Mark:</b> {answer.exited === "Malpractice" ? "0" : answer.totalmark}/
        {totalExamMark}
      </Text>
      <Button
        height="30px"
        width="100px"
        background="#6089F1"
        onClick={() => {
          history.push(
            `/candidate/result?exam_id=${examid}&candidate_id=${answer.candidateid._id}`
          );
        }}
      >
        View Result
      </Button>
    </Paper>
  );
};

export default ResultBar;
