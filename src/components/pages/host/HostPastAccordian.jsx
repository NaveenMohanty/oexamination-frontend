import React, { useEffect } from "react";
import { getHostpast } from "../../../redux/actions/exam";
import { Container } from "../../../styled";
import Accordions from "../../materialui/Accordion";
import { useDispatch, useSelector } from "react-redux";

const HostPastAccordian = () => {
  const dispatch = useDispatch();
  const { hostPast } = useSelector((state) => state.exam);
  useEffect(() => {
    dispatch(getHostpast());
  }, [dispatch]);
  return (
    <Container>
      <Accordions exams={hostPast} user="HOST" />
    </Container>
  );
};

export default HostPastAccordian;
