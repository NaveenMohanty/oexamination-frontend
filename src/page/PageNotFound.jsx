import React from "react";
import HeadFoot from "../components/headerfooter";
import PageNotFoundImg from "../assets/images/404.png";
import { Container, Text, Button } from "../styled";
import history from "../utils/createHistory";

const PageNotFound = () => {
  return (
    <HeadFoot>
      <Container justify="center" align="center" direction="column">
        <Text size="50px" weight="bold" color="red">
          404
        </Text>
        <img width="40%" src={PageNotFoundImg} alt="Page Not Found" />
        <Text size="24px" weight="bold">
          Page Not Found!
        </Text>
        <Button width="15%" size="30px" weight="bold" onClick={history.goBack}>
          Go Back
        </Button>
      </Container>
    </HeadFoot>
  );
};

export default PageNotFound;
