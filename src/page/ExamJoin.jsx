import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import AudioVideo from "../components/pages/examjoin/AudioVideo";
import { ExamContextProvider } from "../components/pages/examjoin/context";

import InstructionScreen from "../components/pages/examjoin/InstructionScreen";
import QuestionPage from "../components/pages/examjoin/questionpage";

const ExamJoin = () => {
  const [videoPermission, setVideoPermission] = useState(false);
  const handle = useFullScreenHandle();

  return (
    <ExamContextProvider>
      <InstructionScreen
        setVideoPermission={setVideoPermission}
        handle={handle}
        videoPermission={videoPermission}
      />

      <FullScreen handle={handle}>
        {handle.active && <QuestionPage />}
        {videoPermission && <AudioVideo active={handle.active} />}
      </FullScreen>
    </ExamContextProvider>
  );
};

export default ExamJoin;
