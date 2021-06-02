import React from "react";
import HeadFoot from "../components/headerfooter";
import { Container, Text, Input, Button } from "../styled";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    height: "70vh",
    minHeight: "300px",
    width: "30vw",
    minWidth: "300px",
  },

  textareadiv: {
    height: "70px",
    width: "80%",
    margin: "10px 0px",
  },
  textarea: {
    background: "#EDF8DF",
    border: "1px solid #000000",
    boxSizing: "border-box",
    borderRadius: "2px",
    padding: "5px",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  return (
    <HeadFoot>
      <Container justify="center" align="center" height="100%">
        <Paper className={classes.paper} elevation={3}>
          <Container justify="center" align="center">
            <Text size="20px">Sign Up</Text>
          </Container>
          <form>
            <Container direction="column" align="center">
              <Input
                margin="10px 0px"
                type="text"
                width="80%"
                height="40px"
                placeholder="Name"
                required
              />
              <Input
                margin="10px 0px"
                height="40px"
                type="email"
                width="80%"
                placeholder="Email"
                required
              />
              <div className={classes.textareadiv}>
                <textarea
                  className={classes.textarea}
                  placeholder="About Yourself"
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="38"
                  required
                ></textarea>
              </div>
              <Input
                margin="10px 0px"
                height="40px"
                type="password"
                width="80%"
                placeholder="Password"
                required
              />
              <Input
                margin="10px 0px"
                height="40px"
                type="password"
                width="80%"
                placeholder="Confirm Password"
                required
              />
              <Container width="80%" justify="flex-end">
                <Button height="35px" width="100px" type="submit">
                  Sign Up
                </Button>
              </Container>
            </Container>
          </form>
        </Paper>
      </Container>
    </HeadFoot>
  );
};

export default SignUp;
