import React, { useState, useEffect } from "react";
import { setErrorAlert } from "../../../redux/actions/alert";
import { Text, Button } from "../../../styled";
import { getUser } from "../../../utils/localStorage";
import DialogBox from "../../materialui/DialogBox";
import ModelForm from "./ModelForm";
import { useDispatch } from "react-redux";
import { updateUser, updateUserPassword } from "../../../redux/actions/user";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (getUser()) {
      let a = getUser().user;
      setUser({ ...a });
    }
  }, []);

  const onSave = async () => {
    const { name, email, userinfo, password, confirmpassword } = user;
    if (password && confirmpassword && password === confirmpassword) {
      if (await dispatch(updateUserPassword(password))) {
        if (await dispatch(updateUser({ name, email, userinfo }))) {
          setOpen(false);
        }
      }
    } else {
      if (password && confirmpassword)
        dispatch(
          setErrorAlert("Password and confirm password are not the same")
        );
      else if ((password && !confirmpassword) || (!password && confirmpassword))
        dispatch(setErrorAlert("Password is not confirmed"));
      else {
        if (await dispatch(updateUser({ name, email, userinfo }))) {
          setOpen(false);
        }
      }
    }
  };
  return (
    <DialogBox
      setOpen={setOpen}
      open={open}
      MainButton={(props) => (
        <Text
          family="IBM Plex Sans"
          size="15px"
          color="white"
          cursor="pointer"
          onClick={props.onClick}
        >
          Welcome{" "}
          {user && (
            <b>{user.name.substr(0, user.name.indexOf(" ")) || user.name}</b>
          )}
        </Text>
      )}
      title="Edit Profile"
      buttons={[{ onClick: onSave, name: "Save" }]}
    >
      <ModelForm details={user} setDetails={setUser} />
    </DialogBox>
  );
};

export default Index;
