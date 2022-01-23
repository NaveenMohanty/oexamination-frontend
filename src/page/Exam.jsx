import React from "react";
import HeadFoot from "../components/headerfooter";
import { Paper } from "@material-ui/core";
import { Container, Text } from "../styled";
import UserAttainedAccordian from "../components/pages/host/UserAttainedAccordian";
import UserUpcomingAccordian from "../components/pages/host/UserUpcomingAccordian";

const Exam = () => {
  return (
    <HeadFoot>
      <Container direction="row" justify="space-between">
        <Container
          width="49%"
          height="84vh"
          overflowY="auto"
          overflowX="hidden"
          direction="column"
        >
          <Paper
            style={{
              display: "flex",
              justifyContent: "center",
              alignItmes: "center",
              width: "100%",
              height: "40px",
              marginBottom: "5px",
            }}
          >
            <Text lineHeight="0px" size="20px">
              Upcoming Examination
            </Text>
          </Paper>
          <UserUpcomingAccordian />
        </Container>
        <Container
          width="49%"
          height="100%"
          overflowY=""
          overflowX=""
          direction="column"
        >
          <Paper
            style={{
              display: "flex",
              justifyContent: "center",
              alignItmes: "center",
              width: "100%",
              height: "40px",
              marginBottom: "5px",
            }}
          >
            <Text lineHeight="0px" size="20px">
              Past Examination
            </Text>
          </Paper>
          <UserAttainedAccordian />
        </Container>
      </Container>
    </HeadFoot>
  );
};

export default Exam;
