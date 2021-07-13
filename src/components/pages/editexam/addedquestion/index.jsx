import React, { useEffect, useState } from "react";
import { Container } from "../../../../styled";
import Question from "./Question";
import { useDispatch } from "react-redux";
import { editExam, getExam } from "../../../../redux/actions/exam";

const AddedQuetion = ({ details, setDetails }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    if (details && details.questions) {
      setQuestion([...details.questions]);
    }
  }, [details]);

  const onRemoveQuetion = async (e, idx) => {
    let arr = question.filter((q, i) => i !== idx);
    if (await dispatch(editExam({ questions: arr }, details._id))) {
      let exam = await dispatch(getExam(details._id));
      if (exam) setDetails(exam);
    }
  };
  return (
    <Container height="47vh" overflowY="auto" align="center" direction="column">
      {question.map((ques, idx) => {
        return (
          <Question question={ques} idx={idx} onRemove={onRemoveQuetion} />
        );
      })}
    </Container>
  );
};

export default AddedQuetion;
