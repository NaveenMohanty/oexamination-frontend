import React from "react";
import { Container, Input } from "../../../styled";
import DateAndTimePicker from "../../materialui/DateAndTimePicker";

const ModelForm = ({ details = null, setDetails = null }) => {
  const classes = {
    textareadiv: {
      height: "70px",
      width: "100%",
      margin: "10px 0px",
    },
    textarea: {
      background: "#EDF8DF",
      border: "1px solid #000000",
      boxSizing: "border-box",
      borderRadius: "2px",
      padding: "5px",
      width: "100%",
      height: "70px",
    },
  };
  const onchange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <Container direction="row" width="450px" justify="space-between">
      <Container direction="column" width="50%">
        <Input
          height="40px"
          margin="10px 0px"
          placeholder="Exam Info"
          name="examtitle"
          value={details["examtitle"] || ""}
          onChange={onchange}
        />
        <div style={classes.textareadiv}>
          <textarea
            style={classes.textarea}
            placeholder="Exam Info"
            name="examinfo"
            value={details["examinfo"] || ""}
            onChange={onchange}
            required
          ></textarea>
        </div>
      </Container>
      <Container direction="column" width="50%">
        <Container margin="10px 0px">
          <DateAndTimePicker
            onChange={(date) => {
              setDetails({ ...details, startingtime: date });
            }}
            title="Starting Time"
            defaultValue={String(details["startingtime"])}
          />
        </Container>
        <Container margin="10px 0px">
          <DateAndTimePicker
            onChange={(date) => {
              setDetails({ ...details, endingtime: date });
            }}
            title="Ending Time"
            defaultValue={details["endingtime"]}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default ModelForm;
