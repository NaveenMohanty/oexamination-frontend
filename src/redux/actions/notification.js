import { GET_NOTIFY, DELETE_SINGLE_NOTIFY, DELETE_ALL_NOTIFY } from "../types";
import useApiHook from "../../services/useApiHook";

export const getNotificationList = (timer) => async (dispatch, getState) => {
  const user_id = getState().user.userId;
  if (!user_id) {
    clearInterval(timer);
    timer = null;
    return;
  }
  const { response } = await useApiHook("GET", {}, `/notification/${user_id}`);

  if (response) {
    dispatch({ type: GET_NOTIFY, payload: response.data });
  }
};

export const deleteSingleNotification = (id) => async (dispatch) => {
  console.log(id);
  const { response } = await useApiHook("DELETE", {}, `/notification/${id}`);

  if (response) {
    // dispatch({ type: DELETE_SINGLE_NOTIFY, payload: id });
    dispatch(getNotificationList());
    return true;
  } else {
    return false;
  }
};

export const deleteAllNotification = () => async (dispatch, getState) => {
  const user_id = getState().user.userId;
  const { response } = await useApiHook(
    "DELETE",
    {},
    `/notification/${user_id}`
  );

  if (response) {
    dispatch({ type: DELETE_ALL_NOTIFY, payload: response.data });
    return true;
  } else {
    return false;
  }
};
