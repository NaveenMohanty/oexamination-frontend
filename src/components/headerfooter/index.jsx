import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "../../styled";

const index = ({ children }) => {
  return (
    <>
      <Header />
      <Container direction="column" height="82vh" background="#EDF8DF">
        {children}
      </Container>
      <Footer />
    </>
  );
};
export default index;
