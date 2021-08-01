import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Button } from "../../../styled";
import MultiSelect from "../../materialui/MultiSelect";
import ModelForm from "../createexamdialog/ModelForm";
import AddQuestionModel from "./addquestion";
import { useDispatch } from "react-redux";
import { editExam, getUserList, deleteExam } from "../../../redux/actions/exam";
import history from "../../../utils/createHistory";

const ExamDetails = ({ details, setDetails }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState([]);
  const [nameInfo, setNameInfo] = useState({
    examtitle: "",
    examinfo: "",
    startingtime: "",
    endingtime: "",
  });
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let arr = await dispatch(getUserList());
      setOptions([...arr]);
      if (details && details.candidates) {
        let added = arr.filter((ele) =>
          details.candidates.find((v) => String(v.id) === String(ele._id))
        );
        setSelectedOption([...added]);
      }
    };
    getData();
    setNameInfo({
      examtitle: details.examtitle,
      examinfo: details.examinfo,
      startingtime: details.startingtime,
      endingtime: details.endingtime,
    });
  }, [dispatch, details]);

  const onSave = async () => {
    await dispatch(
      editExam(
        {
          ...details,
          examtitle: nameInfo.examtitle,
          examinfo: nameInfo.examinfo,
          startingtime: nameInfo.startingtime,
          endingtime: nameInfo.endingtime,
          candidates: selectedOption.map((v) => ({
            id: v._id,
          })),
        },
        details._id
      )
    );
  };
  return (
    <Container direction="row" background="white" width="70%" padding="20px">
      <Container direction="row" width="90%">
        <ModelForm details={nameInfo} setDetails={setNameInfo} />
        <Container width="45%">
          <MultiSelect
            options={options}
            name="email"
            secondName="name"
            label="Candidates"
            placeholder="Select Candidates"
            onChange={setSelectedOption}
            value={selectedOption}
          />
        </Container>
      </Container>
      <Container direction="column" width="10%" justify="space-between">
        <Button
          width="100px"
          height="40px"
          background="#D24C4C"
          onClick={async () => {
            if (await dispatch(deleteExam(details._id))) history.push("/host");
          }}
        >
          Delete Exam
        </Button>
        <Button width="100px" height="40px" onClick={onSave}>
          Save Exam
        </Button>
        <AddQuestionModel details={details} setDetails={setDetails} />
      </Container>
    </Container>
  );
};

export default ExamDetails;
