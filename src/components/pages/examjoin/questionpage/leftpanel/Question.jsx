import React from "react";
import { editAnswer } from "../../../../../redux/actions/exam";
import { Container, Text } from "../../../../../styled";
import { ExamContextConsumer } from "../../context";
import { useDispatch } from "react-redux";
const Question = ({ question, examid }) => {
  const dispatch = useDispatch();
  const { count, answer, setAnswer } = ExamContextConsumer();
  const { answers } = answer;
  React.useEffect(() => {
    async function func() {
      if (await dispatch(editAnswer({ answers }, examid, answer._id))) {
        return;
      }
    }
    func();
  }, [answers, dispatch]);
  const onAnswerSelect = (optionid) => {
    let ans = answers.find((a) => {
      return String(a.questionid) === String(question._id);
    });
    if (ans) {
      setAnswer({
        ...answer,
        answers: [
          ...answers.map((a) => {
            if (String(a.questionid) === String(question._id))
              return { ...a, optionid: optionid };
            else return { ...a };
          }),
        ],
      });
    } else {
      let ans = { questionid: question._id, optionid: optionid };
      setAnswer({ ...answer, answers: [...answers, ans] });
    }
  };

  const isChecked = (optionid) => {
    let ans = answers.find((a) => {
      return (
        String(a.questionid) === String(question._id) &&
        String(a.optionid) === String(optionid)
      );
    });
    if (ans) return String(ans.optionid) === String(optionid);
    else return false;
  };

  return (
    <Container
      width="100%"
      margin="10px 0px"
      direction="column"
      padding="10px 30px"
    >
      <Container justify="flex-end">
        <Text width="10%" size="15px">
          <b>Mark: </b>
          {question.mark}
        </Text>
      </Container>
      <Container direction="row" width="850px" justify="space-between">
        <Text width="10%" size="15px">
          <b>Question {count + 1} </b>
        </Text>
        <Text width="90%" size="17px">
          {question.title}
        </Text>
      </Container>
      <Container direction="row" align="flex-end" justify="space-between">
        <Container width="90%">
          <ol>
            <li
              style={{
                display: "flex",
                height: "25px",
                fontSize: "17px",
              }}
            >
              <input
                type="radio"
                id="answer"
                name="answer"
                checked={isChecked(question.options[0]._id)}
                onChange={() => onAnswerSelect(question.options[0]._id)}
              />
              <label id="answer" name="answer">
                {question.options[0].option}
              </label>
            </li>
            <li style={{ display: "flex", height: "25px", fontSize: "17px" }}>
              <input
                type="radio"
                id="answer"
                name="answer"
                checked={isChecked(question.options[1]._id)}
                onChange={() => onAnswerSelect(question.options[1]._id)}
              />
              <label id="answer" name="answer">
                {question.options[1].option}
              </label>
            </li>
            <li style={{ display: "flex", height: "25px", fontSize: "17px" }}>
              <input
                type="radio"
                id="answer"
                name="answer"
                checked={isChecked(question.options[2]._id)}
                onChange={() => onAnswerSelect(question.options[2]._id)}
              />
              <label id="answer" name="answer">
                {question.options[2].option}
              </label>
            </li>
            <li style={{ display: "flex", height: "25px", fontSize: "17px" }}>
              <input
                type="radio"
                id="answer"
                name="answer"
                checked={isChecked(question.options[3]._id)}
                onChange={() => onAnswerSelect(question.options[3]._id)}
              />
              <label id="answer" name="answer">
                {question.options[3].option}
              </label>
            </li>
          </ol>
        </Container>
      </Container>
    </Container>
  );
};

export default Question;
