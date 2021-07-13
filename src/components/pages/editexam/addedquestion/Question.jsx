import React from "react";
import { Container, Text, Button } from "../../../../styled";
import CheckIcon from "@material-ui/icons/Check";

const Question = ({ question, idx, onRemove }) => {
  return (
    <Container
      width="80vw"
      margin="10px 0px"
      background="white"
      direction="column"
      padding="10px 30px"
    >
      <Container direction="row" justify="space-between">
        <Container direction="row" width="90%">
          <Text width="10%" size="15px">
            <b>Question {idx + 1}: </b>
          </Text>
          <Text width="80%" size="15px">
            {question.title}
          </Text>
        </Container>
        <Text width="10%" size="15px">
          <b>Mark: </b>
          {question.mark}
        </Text>
      </Container>
      <Container direction="row" align="flex-end" justify="space-between">
        <Container width="90%">
          <ol>
            <Text lineHeight="0px" family="bold">
              Options:
            </Text>
            {question.options.map((opt, idx) => (
              <li style={{ display: "flex" }}>
                <Text lineHeight="0px">
                  {idx + 1}: {opt.option}
                </Text>
                {opt.isanswer && (
                  <CheckIcon fontSize="small" style={{ color: "green" }} />
                )}
              </li>
            ))}
          </ol>
        </Container>
        <Button
          postion="absolute"
          bottom="0px"
          right="0px"
          width="60px"
          height="30px"
          background="#D24C4C"
          onClick={(e) => onRemove(e, idx)}
        >
          Remove
        </Button>
      </Container>
    </Container>
  );
};

export default Question;
