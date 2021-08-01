import React, { useEffect, useState } from "react";
import { editExam, getExam } from "../../../../redux/actions/exam";
import { Button } from "../../../../styled";
import DialogBox from "../../../materialui/DialogBox";
import QuestionModelForm from "./QuestionModelForm";
import { useDispatch } from "react-redux";
import { setErrorAlert } from "../../../../redux/actions/alert";

const Question = ({ details, setDetails }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [question, setQuestion] = useState({
    title: "",
    options: [
      {
        option: "",
        isanswer: true,
      },
      {
        option: "",
        isanswer: false,
      },
      {
        option: "",
        isanswer: false,
      },
      {
        option: "",
        isanswer: false,
      },
    ],
    mark: 0,
  });

  const onAdds = async () => {
    if (
      question.title &&
      question.options[0].option &&
      question.options[1].option &&
      question.options[2].option &&
      question.options[3].option &&
      question.mark
    ) {
      let ques = details.questions;
      ques.push(question);
      let body = { questions: ques };
      if (await dispatch(editExam(body, details._id))) {
        setOpen(false);
        let exam = await dispatch(getExam(details._id));
        if (exam) setDetails(exam);
        setQuestion({
          title: "",
          options: [
            {
              option: "",
              isanswer: true,
            },
            {
              option: "",
              isanswer: false,
            },
            {
              option: "",
              isanswer: false,
            },
            {
              option: "",
              isanswer: false,
            },
          ],
          mark: 0,
        });
      }
    } else {
      dispatch(setErrorAlert("Fill Question details properly"));
    }
  };

  return (
    <DialogBox
      open={open}
      setOpen={setOpen}
      title="Add Question"
      buttons={[{ onClick: () => onAdds(), name: "Add" }]}
      MainButton={(props) => (
        <Button
          width="100px"
          height="40px"
          background="blue"
          onClick={props.onClick}
        >
          Add Question
        </Button>
      )}
    >
      <QuestionModelForm question={question} setQuestion={setQuestion} />
    </DialogBox>
  );
};

export default Question;
