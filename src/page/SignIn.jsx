import React, { useState } from "react";
import HeadFoot from "../components/headerfooter";
import { Container, Text, Input, Button } from "../styled";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { signIn } from "../redux/actions/user";
import history from "../utils/createHistory";
const useStyles = makeStyles((theme) => ({
  paper: {
    height: "40vh",
    minHeight: "200px",
    width: "30vw",
    minWidth: "300px",
  },
}));

const SignIn = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const { email, password } = details;
  const handelChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 9) {
      if (await dispatch(signIn(details))) {
        setTimeout(() => {
          history.push("/host");
        }, 1000);
        setDetails({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <HeadFoot>
      <Container justify="center" align="center" height="100%">
        <Paper className={classes.paper} elevation={3}>
          <Container justify="center" align="center">
            <Text size="20px">Sign In</Text>
          </Container>
          <form onSubmit={onSubmit}>
            <Container direction="column" align="center">
              <Input
                margin="10px 0px"
                height="40px"
                type="email"
                value={email}
                width="80%"
                placeholder="Email"
                name="email"
                onChange={handelChange}
                required
              />

              <Input
                margin="10px 0px"
                height="40px"
                type="password"
                minLength={9}
                value={password}
                width="80%"
                placeholder="Password"
                name="password"
                onChange={handelChange}
                required
              />
              <Container width="80%" justify="flex-end">
                <Button
                  height="35px"
                  width="100px"
                  type="submit"
                  onSubmit={onSubmit}
                >
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
