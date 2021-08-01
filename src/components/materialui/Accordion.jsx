import React, { useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Button, Text } from "../../styled";
import history from "../../utils/createHistory";

export default function Accordions({ exams = [], user = null }) {
  const [expanded, setExpanded] = React.useState(false);
  const [examData, setExamData] = React.useState([]);

  useEffect(() => {
    let timer = null;
    setExamData((prevExam) => {
      return exams.map((exam) => {
        let now = Date.parse(Date());
        let start = Date.parse(exam.startingtime);
        let end = Date.parse(exam.endingtime);
        if (now < start) {
          return "edit";
        } else if (now >= start && now < end) {
          return "join";
        } else if (end < now && start < now) {
          return "result";
        }
      });
    });
    timer = setInterval(() => {
      setExamData((prevExam) => {
        return exams.map((exam) => {
          let now = Date.parse(Date());
          let start = Date.parse(exam.startingtime);
          let end = Date.parse(exam.endingtime);
          if (now < start) {
            return "edit";
          } else if (now >= start && now < end) {
            return "join";
          } else if (end < now && start < now) {
            return "result";
          }
        });
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [exams]);

  const Buttons = ({ type, exam = null }) => {
    switch (examData[type]) {
      case "edit":
        if (user === "HOST") {
          return (
            <Button
              height="30px"
              width="80px"
              background="#4CA2D2"
              onClick={() => {
                history.push(`/exam/edit?exam_id=${exam._id}`);
              }}
            >
              Edit
            </Button>
          );
        } else {
          return (
            <Button height="30px" width="80px" background="#C9E4D7">
              Join
            </Button>
          );
        }
      case "join":
        return (
          <Button
            height="30px"
            width="80px"
            background="#82DAB0"
            onClick={() => {
              user === "HOST"
                ? history.push(`/host/joinexam?exam_id=${exam._id}`)
                : // : history.push(`/joinexam?exam_id=${exam._id}`);
                  window.open(`/joinexam?exam_id=${exam._id}`, "_blank");
            }}
          >
            {user === "HOST" ? "Exam Live" : "Join"}
          </Button>
        );
      case "result":
        return (
          <Button
            height="30px"
            width="100px"
            background="#6089F1"
            onClick={() =>
              user === "HOST"
                ? history.push(`/exam/result?exam_id=${exam._id}`)
                : history.push(`/candidate/result?exam_id=${exam._id}`)
            }
          >
            View Result
          </Button>
        );
      default:
        return <></>;
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const timeConverter = (date = Date()) => {
    var D = new Date(date);
    let dateString = `${D.toLocaleDateString()} ${D.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
    return dateString;
  };

  return (
    <Container direction="column">
      {exams.map((exam, idx) => (
        <Accordion
          expanded={expanded === String(exam._id)}
          onChange={handleChange(String(exam._id))}
          key={String(exam._id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Container direction="row" align="center">
              <Container width="30%">
                <Text lineHeight={0} size="18px">
                  {exam.examtitle}
                </Text>
              </Container>
              <Container width="55%">
                <Text lineHeight={0} size="15px">
                  <b>Starting: </b>
                  {timeConverter(exam.startingtime)}
                </Text>
              </Container>
              <Container>
                <Buttons type={idx} exam={exam} />
              </Container>
            </Container>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "10px" }}>
            <Container direction="column">
              <Container>
                <Text lineHeight="15px">{exam.examinfo}</Text>
              </Container>
              <Container direction="column">
                <Container>
                  <Text>
                    <b>Hosted By: </b>
                    {exam.host.name}
                  </Text>
                </Container>
                <Container>
                  <Container flex={0.5}>
                    <Text>
                      <b>Starting: </b>
                      {timeConverter(exam.startingtime)}
                    </Text>
                  </Container>
                  <Container flex={0.5}>
                    <Text>
                      <b>Ending: </b>
                      {timeConverter(exam.endingtime)}
                    </Text>
                  </Container>
                </Container>
              </Container>
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
