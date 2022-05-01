import React from "react";
import HeaderFooter from "../components/headerfooter";
import { Container } from "../styled";
import IconButtons from "../components/materialui/IconButtons";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import history from "../utils/createHistory";

const Feedback = () => {
  return (
    <HeaderFooter>
      <IconButtons
        width="50px"
        height="30px"
        color="black"
        tooltipTitle="Back"
        tooltipPlacement="right"
        onClick={() => {
          history.goBack();
        }}
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </IconButtons>
      <Container align="center" height="100%" justify="center">
        {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScdTjvHD8grZz629PGneMfJnov42jaZhgoDysnuB6aifxlhTw/viewform?embedded=true" width="640" height="1165" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
        <iframe
          style={{ border: "none" }}
          src="https://docs.google.com/forms/d/e/1FAIpQLScdTjvHD8grZz629PGneMfJnov42jaZhgoDysnuB6aifxlhTw/viewform?embedded=true"
          height="90%"
          width="100%"
          title="Feedback Form"
        >
          Loading…
        </iframe>
      </Container>
    </HeaderFooter>
  );
};

export default Feedback;
