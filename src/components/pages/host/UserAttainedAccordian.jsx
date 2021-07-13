import React, { useEffect } from "react";
import { getUserAttaineded } from "../../../redux/actions/exam";
import { Container } from "../../../styled";
import Accordions from "../../materialui/Accordion";
import { useDispatch, useSelector } from "react-redux";

const UserAttainedAccordian = () => {
  const dispatch = useDispatch();
  const { past } = useSelector((state) => state.exam);
  useEffect(() => {
    dispatch(getUserAttaineded());
  }, [dispatch]);
  return (
    <Container>
      <Accordions exams={past} user="EXAM" />
    </Container>
  );
};

export default UserAttainedAccordian;
