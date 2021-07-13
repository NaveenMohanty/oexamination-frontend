import React, { useEffect } from "react";
import { getUserUpcoming } from "../../../redux/actions/exam";
import { Container } from "../../../styled";
import Accordions from "../../materialui/Accordion";
import { useDispatch, useSelector } from "react-redux";

const UserUpcomingAccordian = () => {
  const dispatch = useDispatch();
  const { upcoming } = useSelector((state) => state.exam);
  useEffect(() => {
    dispatch(getUserUpcoming());
  }, [dispatch]);
  return (
    <Container>
      <Accordions exams={upcoming} user="EXAM" />
    </Container>
  );
};

export default UserUpcomingAccordian;
