import { SET_USER } from "../types";
import history from "../../utils/createHistory";
import axiosHook from "../../axios";
import { addUser, removeUser } from "../../utils/localStorage";
import { getUser } from "../../utils/localStorage";

export const signIn = (details) => async (dispatch) => {
  const { response, error } = await axiosHook("/signin", "POST", details);
  if (!error) {
    const { token, user } = response.data;
    await addUser({ token, user, isLogin: true });
    dispatch({ type: SET_USER, payload: user });
    return true;
  } else {
    return false;
  }
};

export const signUp = (details) => async (dispatch) => {
  const { error } = await axiosHook("/signup", "POST", details);
  if (!error) {
    history.push("/signin");
    return true;
  } else {
    return false;
  }
};

export const signOut = () => async (dispatch) => {
  const { error } = await axiosHook("/signout");
  if (!error) {
    removeUser();
    dispatch({ type: SET_USER, payload: {} });
    history.push("/signin");
    return true;
  } else {
    return false;
  }
};

export const updateUser = (payload) => async (dispatch) => {
  let user = getUser().user;
  const { error } = await axiosHook(`/user/${user._id}`, "POST", payload);
  if (!error) {
    return true;
  } else {
    return false;
  }
};

export const updateUserPassword = (password) => async (dispatch) => {
  let user = getUser().user;
  const { error } = await axiosHook(`/changepassword/${user._id}`, "PUT", {
    password,
  });
  if (!error) {
    return true;
  } else {
    return false;
  }
};
