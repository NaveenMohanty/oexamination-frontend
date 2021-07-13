import React, { useEffect } from "react";
import { getHostUpcoming } from "../../../redux/actions/exam";
import { Container } from "../../../styled";
import Accordions from "../../materialui/Accordion";
import { useDispatch, useSelector } from "react-redux";
const HostUpcomigAccordian = () => {
  const dispatch = useDispatch();
  const { hostUpcoming } = useSelector((state) => state.exam);
  useEffect(() => {
    dispatch(getHostUpcoming());
  }, [dispatch]);
  return (
    <Container>
      <Accordions exams={hostUpcoming} user="HOST" />
    </Container>
  );
};

export default HostUpcomigAccordian;
