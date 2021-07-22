import React from "react";
import ExamPage from "../components/pages/examjoin";
import { ExamContextProvider } from "../components/pages/examjoin/context";

const ExamJoin = () => {
  return (
    <ExamContextProvider>
      <ExamPage />
    </ExamContextProvider>
  );
};

export default ExamJoin;
