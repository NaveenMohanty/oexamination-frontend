import React from "react";
import { Container, Input, Text } from "../../../styled";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    width: "100%",
    height: "70px",
  },
}));

const ModelForm = ({ details, setDetails }) => {
  const classes = useStyles();

  const onchange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <Container direction="column" width="40vw">
      <form>
        <Container direction="column" align="center">
          <Input
            margin="10px 0px"
            type="text"
            width="80%"
            height="40px"
            name="name"
            placeholder="Name"
            value={details["name"] || ""}
            onChange={onchange}
            maxLength={30}
            required
          />
          <Input
            margin="10px 0px"
            height="40px"
            type="email"
            name="email"
            width="80%"
            value={details["email"] || ""}
            onChange={onchange}
            placeholder="Email"
            required
          />
          <div className={classes.textareadiv}>
            <textarea
              className={classes.textarea}
              placeholder="About Yourself"
              name="userinfo"
              value={details["userinfo"] || ""}
              onChange={onchange}
              required
            ></textarea>
          </div>
          <Text lineHeight="12px" color="red">
            *Enter Password and Confirm Password if you want to change password
            else leave blank
          </Text>
          <Input
            margin="10px 0px"
            height="40px"
            type="password"
            name="password"
            width="80%"
            value={details["password"] || ""}
            onChange={onchange}
            placeholder="Password"
            minLength={9}
          />
          <Input
            margin="10px 0px"
            height="40px"
            type="password"
            name="confirmpassword"
            width="80%"
            placeholder="Confirm Password"
            value={details["confirmpassword"] || ""}
            onChange={onchange}
            minLength={9}
          />
        </Container>
      </form>
    </Container>
  );
};

export default ModelForm;
