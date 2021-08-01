import React from "react";
import { useTimer } from "react-timer-hook";
import { Text } from "../../../../../styled";
import { ExamContextConsumer } from "../../context";

function MyTimer({ expiryTimestamp }) {
  const { exitExam } = ExamContextConsumer();
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      exitExam("Exited", true);
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Text size="20px" weight="bold" lineHeight="0px">
        Time Left
      </Text>
      <div style={{ fontSize: "30px", color: "red" }}>
        <span>{hours < 10 ? `0${hours}` : hours}</span>:
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </div>
  );
}

export default function Timer({ start, end }) {
  return <MyTimer expiryTimestamp={new Date(end)} />;
}
