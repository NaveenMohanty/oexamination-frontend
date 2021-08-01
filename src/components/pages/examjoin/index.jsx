import React from "react";
import AudioVideo from "./AudioVideo";
import { ExamContextConsumer } from "./context";
import InstructionScreen from "./InstructionScreen";
import QuestionPage from "./questionpage";

const Index = () => {
  const { isFullscreen, videoPermission } = ExamContextConsumer();
  return (
    <>
      {!isFullscreen && <InstructionScreen />}

      {/* <FullScreen handle={handle}> */}
      {isFullscreen && (
        <div
          style={{
            height: "100vh",
          }}
          id="fullscreen_id"
        >
          <QuestionPage />
        </div>
      )}
      {videoPermission && <AudioVideo active={isFullscreen} />}

      {/* </FullScreen> */}
    </>
  );
};

export default Index;
