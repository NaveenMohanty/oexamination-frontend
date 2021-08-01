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
  const Peer = useRef(null);

  //************************* Functions *************************************
  var timer = null;

  var element = document.documentElement;

  const UpdatePeer = (peer) => {
    Peer.current = peer;
  };

  const getWarn = () => {
    const warn = sessionStorage.getItem("Warn");
    if (warn) {
      return parseInt(warn);
    } else {
      sessionStorage.setItem("Warn", "0");
      return 0;
    }
  };

  const incrWarn = () => {
    const warn = sessionStorage.getItem("Warn");
    if (warn) {
      sessionStorage.setItem("Warn", (parseInt(warn) + 1).toString());
      return parseInt(warn) + 1;
    } else {
      sessionStorage.setItem("Warn", "1");
      return 1;
    }
  };

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

    timer = setInterval(() => {
      incrWarn();
      try {
        Peer.current.send(getWarn().toString());
      } catch (error) {
        console.warn("Error:", error);
      }
    }, 10000);
  }

  function play(e = null) {
    if (e) e.stopPropagation();
    clearInterval(timer);
  }

  function checkFullScreen(e = null) {
    if (e) e.stopPropagation();

    if (window.document.fullscreenElement) {
      setIsFullscreen(true);
      play();
    } else {
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
        UpdatePeer,
        getWarn,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}
