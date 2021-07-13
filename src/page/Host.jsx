import { Paper } from "@material-ui/core";
import React from "react";
import HeadFoot from "../components/headerfooter";

import { Container, Text } from "../styled";

import HostUpcomigAccordian from "../components/pages/host/HostUpcomigAccordian";
import HostPastAccordian from "../components/pages/host/HostPastAccordian";
import CreateExamDialog from "../components/pages/createexamdialog";

const Host = () => {
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
            <CreateExamDialog />
          </Paper>
          <HostUpcomigAccordian />
        </Container>
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
              Past Examination
            </Text>
          </Paper>
          <HostPastAccordian />
        </Container>
      </Container>
    </HeadFoot>
  );
};

export default Host;
