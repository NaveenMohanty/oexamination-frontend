import { SET_ALERT, UNSET_ALERT } from "../types";

const initialState = {
  message: "",
  type: "",
  duration: 0,
};

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        message: payload["message"] || "",
        type: payload["type"] || "success",
        duration: payload["duration"] || 3000,
      };

    case UNSET_ALERT:
      return {
        message: "",
        type: "",
        duration: 0,
      };

    default:
      return state;
  }
};

export default alertReducer;
