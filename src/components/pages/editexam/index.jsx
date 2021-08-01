import React, { useEffect, useState } from "react";
import { Container } from "../../../styled";
import ExamDetails from "./ExamDetails";
import { useDispatch } from "react-redux";
import { getExam } from "../../../redux/actions/exam";
import history from "../../../utils/createHistory";
import AddedQuetion from "./addedquestion";

const Editexam = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  useEffect(() => {
    const func = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const exam_id = queryParams.get("exam_id");
      let exam = await dispatch(getExam(exam_id));
      if (exam) setDetails(exam);
      else history.push("/host");
    };
    func();
  }, [dispatch]);

  return (
    <Container direction="column" align="center">
      <ExamDetails details={details} setDetails={setDetails} />
      <AddedQuetion details={details} setDetails={setDetails} />
    </Container>
  );
};

export default Editexam;
