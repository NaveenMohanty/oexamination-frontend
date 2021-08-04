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
        <iframe
          border="none"
          src="https://forms.gle/zxjBWdHo9dQnE9sy7"
          height="90%"
          width="50%"
          title="Feedback Form"
        ></iframe>
      </Container>
    </HeaderFooter>
  );
};

export default Feedback;
