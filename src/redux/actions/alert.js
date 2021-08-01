import { SET_ALERT } from "../types";

export const setSuccessAlert =
  (message = "", duration = 3000) =>
  async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type: "success", duration },
    });
  };

export const setErrorAlert =
  (message = "", duration = 3000) =>
  async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type: "error", duration },
    });
  };

export const setCustomAlert =
  (message = "", type = "warning", duration = 3000) =>
  async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type, duration },
    });
  };
