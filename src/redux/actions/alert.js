import { SET_ALERT } from "../types";

export const setSuccessAlert =
  (message = "", type = "success", durartion = 3000) =>
  async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type, durartion },
    });
  };

export const setErrorAlert =
  (message = "", type = "error", durartion = 3000) =>
  async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type, durartion },
    });
  };
