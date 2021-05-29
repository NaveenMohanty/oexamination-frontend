import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "../../styled";

const index = ({ children }) => {
  return (
    <Container direction="column">
      <Header />
      {children}
      <Footer />
    </Container>
  );
};
export default index;
