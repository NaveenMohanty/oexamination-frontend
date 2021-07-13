import React, { useEffect, useState } from "react";
import { Container } from "../../../styled";
import ResultBar from "./ResultBar";
import ResultHead from "./ResultHead";
import { useDispatch, useSelector } from "react-redux";
import { getExam, getHostedExamAnswerList } from "../../../redux/actions/exam";
import history from "../../../utils/createHistory";

const Index = () => {
  const dispatch = useDispatch();
  const [answerList, setAnswerList] = useState([]);
  const { currentExam } = useSelector((state) => state.exam);
  useEffect(() => {
    const func = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const exam_id = queryParams.get("exam_id");
      let exam = await dispatch(getExam(exam_id));
      if (exam) setAnswerList(await dispatch(getHostedExamAnswerList(exam_id)));
      else history.push("/host");
    };
    func();
  }, [dispatch]);
  const totalExamMark = () => {
    const { questions } = currentExam;
    let totalMark = 0;
    questions.map((question) => {
      totalMark += question.mark;
    });
    return totalMark;
  };
  return (
    <Container direction="column" align="center">
      <ResultHead />
      <Container
        overflowY="auto"
        height="60vh"
        align="center"
        direction="column"
      >
        {answerList.map((answer, idx) => (
          <ResultBar
            answer={answer}
            totalExamMark={totalExamMark()}
            examid={currentExam._id}
            key={idx}
          />
        ))}
      </Container>
    </Container>
  );
};

export default Index;
