import React from "react";
import HeaderFooter from "../components/headerfooter";
import IconButtons from "../components/materialui/IconButtons";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import history from "../utils/createHistory";
import Editexam from "../components/pages/editexam";

const EditExam = () => {
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
      <Editexam />
    </HeaderFooter>
  );
};

export default EditExam;
