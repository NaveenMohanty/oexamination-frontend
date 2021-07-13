import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DialogBox from "../../materialui/DialogBox";
import IconButtons from "../../materialui/IconButtons";
import ModelForm from "./ModelForm";
import { useDispatch } from "react-redux";
import { setErrorAlert } from "../../../redux/actions/alert";
import {
  createExam,
  getHostpast,
  getHostUpcoming,
} from "../../../redux/actions/exam";

const CreateExamDialog = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    examtitle: "",
    examinfo: "",
    startingtime: "",
    endingtime: "",
  });
  const [open, setOpen] = useState(false);
  const handelCreateExam = async () => {
    const { examtitle, examinfo, startingtime, endingtime } = details;
    let now = Date.parse(Date());
    let start = Date.parse(startingtime);
    let end = Date.parse(endingtime);
    if (examtitle && examinfo && now < start && start < end) {
      if (await dispatch(createExam(details))) {
        dispatch(getHostpast());
        dispatch(getHostUpcoming());
        setDetails({
          examtitle: "",
          examinfo: "",
          startingtime: "",
          endingtime: "",
        });
        setOpen(false);
      }
    } else {
      dispatch(setErrorAlert("Enter Valid Input"));
    }
  };
  return (
    <DialogBox
      setOpen={setOpen}
      open={open}
      MainButton={(props) => (
        <IconButtons
          backgroundColor="#47926E"
          height="10px"
          width="10px"
          position="absolute"
          top="6px"
          right="10px"
          color="white"
          tooltipTitle="Create Exam"
          tooltipPlacement="right"
          onClick={props.onClick}
        >
          <AddIcon />
        </IconButtons>
      )}
      title="Create Exam"
      buttons={[{ onClick: handelCreateExam, name: "Create" }]}
    >
      <ModelForm setDetails={setDetails} details={details} />
    </DialogBox>
  );
};

export default CreateExamDialog;
