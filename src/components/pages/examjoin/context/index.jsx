import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExam,
  createAnswer,
  exitAnswer,
} from "../../../../redux/actions/exam";
import history from "../../../../utils/createHistory";

export const ExamContext = createContext();

export function ExamContextConsumer() {
  return useContext(ExamContext);
}

export function ExamContextProvider({ children }) {
  const { currentExam } = useSelector((state) => state.exam);
  const dispatch = useDispatch();

  //**************** States******************************
  const [answer, setAnswer] = useState(null);
  const [count, setCount] = useState(0);
  const [videoPermission, setVideoPermission] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  //************************* Functions *************************************
  var timer = null;

  var element = document.documentElement;

  const toogleFullscreen = async () => {
    if (window.document.fullscreenElement) {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        setIsFullscreen(true);
      }
    } else {
      try {
        await element.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        setIsFullscreen(false);
      }
    }
  };

  function pause(e = null) {
    if (e) e.stopPropagation();
    console.log("not focused");
    timer = setTimeout(() => {
      exitExam("Malpractice");
    }, 10000);
  }

  function play(e = null) {
    if (e) e.stopPropagation();
    clearTimeout(timer);
    console.log("focused");
  }

  function checkFullScreen(e = null) {
    if (e) e.stopPropagation();

    if (window.document.fullscreenElement) {
      console.log(`entered full-screen mode.`);
      setIsFullscreen(true);
      play();
    } else {
      console.log("Leaving full-screen mode.");
      setIsFullscreen(false);
      pause();
    }
  }

  const exitExam = async (msg, exit = false) => {
    if (exit) {
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", play);
      element.removeEventListener("fullscreenchange", checkFullScreen);
      clearTimeout(timer);
      if (window.document.fullscreenElement) toogleFullscreen();
      history.push("/exam");
    } else if (
      currentExam &&
      answer &&
      (await dispatch(exitAnswer(msg, currentExam._id, answer._id)))
    ) {
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", play);
      element.removeEventListener("fullscreenchange", checkFullScreen);
      clearTimeout(timer);
      if (window.document.fullscreenElement) toogleFullscreen();
      history.push("/exam");
    }
  };

  const activateEvents = () => {
    window.addEventListener("blur", pause);
    window.addEventListener("focus", play);
    element.addEventListener("fullscreenchange", checkFullScreen);
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
      value={{
        answer,
        setAnswer,
        count,
        setCount,
        exitExam,
        videoPermission,
        setVideoPermission,
        agree,
        setAgree,
        activateEvents,
        toogleFullscreen,
        isFullscreen,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}
