import React, { useState, useEffect } from "react";
import { getCandidateAnswer, getExam } from "../../../redux/actions/exam";
import { Container } from "../../../styled";
import QuesAns from "./QuesAns";
import ResultHead from "./ResultHead";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../utils/createHistory";

const Index = () => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const { currentExam } = useSelector((state) => state.exam);
  useEffect(() => {
    const func = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const exam_id = queryParams.get("exam_id");
      const candidate_id = queryParams.get("candidate_id");

      let exam = await dispatch(getExam(exam_id));
      if (exam)
        setAnswer(await dispatch(getCandidateAnswer(exam_id, candidate_id)));
      else history.push("/host");
    };
    func();
  }, [dispatch]);

  return (
    <Container direction="column" align="center">
      <ResultHead answer={answer} />
      <Container
        overflowY="auto"
        height="60vh"
        align="center"
        direction="column"
      >
        {currentExam &&
          currentExam.questions &&
          currentExam.questions.map((question, idx) => (
            <QuesAns question={question} answer={answer} idx={idx} key={idx} />
          ))}
      </Container>
    </Container>
  );
};

export default Index;
