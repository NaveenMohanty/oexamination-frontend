import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExam,
  createAnswer,
  exitAnswer,
} from "../../../../redux/actions/exam";
import history from "../../../../utils/createHistory";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export const ExamContext = createContext();

export function ExamContextConsumer() {
  return useContext(ExamContext);
}

export function ExamContextProvider({ children }) {
  const { currentExam } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(null);
  const [count, setCount] = useState(0);
  const handle = useFullScreenHandle();
  const exitExam = async (msg) => {
    if (
      currentExam &&
      answer &&
      (await dispatch(exitAnswer(msg, currentExam._id, answer._id)))
    ) {
      history.push("/exam");
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const exam_id = queryParams.get("exam_id");
    async function getValue() {
      if (await dispatch(getExam(exam_id))) {
        let a = await dispatch(createAnswer(exam_id));
        if (a) setAnswer({ ...a });
      }
    }
    getValue();
  }, [dispatch]);

  return (
    <ExamContext.Provider
      value={{ answer, setAnswer, count, setCount, exitExam, handle }}
    >
      {children}
    </ExamContext.Provider>
  );
}
