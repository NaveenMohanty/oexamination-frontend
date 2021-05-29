import React from "react";
import { Container, Text } from "../../styled";

const Header = () => {
  return (
    <Container
      direction="row"
      background="#47926E"
      height="50px"
      align="center"
    >
      <Text family="Rochester" size="25px" color="#F3EA16" margin="0 0 0 3vw">
        Oexamination
      </Text>
    </Container>
  );
};

export default Header;
