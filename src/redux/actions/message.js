import { SEND_MASS_MAIL, SENT_MASS_NOTIFICATION, GET_MASSMAIL, DELETE_MASSMAIL } from "../types";
import useApiHook from "../../services/useApiHook";

export const getMassMail = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/mass-mail");

  if (response) {
    dispatch({ type: GET_MASSMAIL, payload: response.data });
  }
};

export const sendMassMail = (msg) => async (dispatch) => {
  console.log(msg);
  const { response } = await useApiHook("POST", msg, `/mass-mail`);
  if (response) {
    return true;
  } else {
    return false;
  }
};

export const deleteMassMail = (id) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/mass-mail/${id}`);

  if (response) {
    dispatch({ type: DELETE_MASSMAIL, payload: id });
    return true;
  } else {
    return false;
  }
};

export const sendMassNotification = (msg) => async (dispatch) => {
  const { response } = await useApiHook("POST", msg, `/mass-notification`);

  if (response) {
    return true;
  } else {
    return false;
  }
};
