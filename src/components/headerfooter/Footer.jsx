import React from "react";
import { Container, Button } from "../../styled";
import githubLogo from "../../assets/images/github.svg";
import history from "../../utils/createHistory";

const imageStyle = {
  height: "20px",
  with: "20px",
  margin: "0 0 0 -3vw",
};
const Footer = () => {
  return (
    <Container
      direction="row"
      background="black"
      align="center"
      justify="space-between"
      padding="10px 0px"
      position="fixed"
      bottom="0px"
    >
      <a
        href="https://github.com/NaveenMohanty"
        target="_blank"
        rel="noreferrer"
      >
        <Container
          direction="column"
          width="50px"
          justify="center"
          margin="15px 0  0 3vw"
        >
          <img style={imageStyle} src={githubLogo} alt="" />
        </Container>
      </a>
      <Button
        margin="0px 10px 0px 0px"
        padding="5px"
        width="none"
        height="none"
        onClick={() => history.push("/feedback")}
      >
        Feedback
      </Button>
    </Container>
  );
};

export default Footer;
