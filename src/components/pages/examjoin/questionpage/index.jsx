import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../../styled";
import Header from "./header";
import LeftPanel from "./leftpanel";
import RightPanel from "./rightpanel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ExamContextConsumer } from "../context";

const Index = () => {
  const { loader } = useSelector((state) => state);
  const { activateEvents } = ExamContextConsumer();
  useEffect(() => {
    activateEvents();
  }, []);

  return (
    <Container
      height="100%"
      width="100%"
      direction="column"
      background="#EDF8DF"
    >
      {loader > 0 && (
        <Container
          position="absolute"
          top="0px"
          background="rgb(0, 0, 0,0.5)"
          justify="center"
          align="center"
          width="100%"
          height="100%"
          zIndex={2}
        >
          <CircularProgress
            style={{ height: "60px", width: "60px", color: "green" }}
          />
        </Container>
      )}
      <Header />
      <Container direction="row">
        <LeftPanel />
        <RightPanel />
      </Container>
    </Container>
  );
};

export default Index;
