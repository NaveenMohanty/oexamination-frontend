import React from "react";
import HeadFoot from "../components/headerfooter";
import { Container, Text, Input, Button } from "../styled";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    height: "40vh",
    minHeight: "200px",
    width: "30vw",
    minWidth: "300px",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  return (
    <HeadFoot>
      <Container justify="center" align="center" height="100%">
        <Paper className={classes.paper} elevation={3}>
          <Container justify="center" align="center">
            <Text size="20px">Sign In</Text>
          </Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <Container direction="column" align="center">
              <Input
                margin="10px 0px"
                height="40px"
                type="email"
                width="80%"
                placeholder="Email"
                name="email"
                required
              />

              <Input
                margin="10px 0px"
                height="40px"
                type="password"
                width="80%"
                placeholder="Password"
                name="password"
                required
              />
              <Container width="80%" justify="flex-end">
                <Button height="35px" width="100px" type="submit">
                  Sign In
                </Button>
              </Container>
            </Container>
          </form>
        </Paper>
      </Container>
    </HeadFoot>
  );
};

export default SignIn;
