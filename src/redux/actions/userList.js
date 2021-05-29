import {
  GET_USERS,
  POST_USERS,
  PUT_USERS,
  DELETE_USERS,
  ACTIVATE_USER,
  DEACTIVATE_USER,
  TWO_FA,
  LOG_IN,
} from "../types";
import useApiHook from "../../services/useApiHook";
import {
  backendResetPasswordValidation,
  phoneNumberValidatn,
  patchUserValidatn
} from "../../validation";
import history from "../../utils/createHistory";
import { resendOtp } from "./user";
import { addUserData } from "../../utils/localStorage";

/**
 * Redux actons for engine table data
 * @module redux/actions/userList
 */

/**
 * Gets engin table data
 * @returns {void}
 */

export const getUserList =
  (page = 0, rows = 50) =>
    async (dispatch) => {
      const { response } = await useApiHook(
        "GET",
        {},
        `/users?page=${page + 1}&rows=${rows}`
      );

      if (response) {
        response.data = response.data.map((users) => ({
          ...users,
          userList: users.userList,
        }));
        dispatch({ type: GET_USERS, payload: response.data });
      }
    };
/**
 * Add new user  to list
 * @param {Array} userList
 * @returns {boolean}
 */
export const addUserList = (userData) => async (dispatch) => {
  const { response } = await useApiHook("POST", userData, "/users");

  if (response) {
    dispatch({ type: POST_USERS, payload: response });
    return true;
  } else {
    return false;
  }
};
/**
 * Edited engine table data
 * @param {Array} engineData
 * @returns {boolean}
 */
export const editUserList = (userData) => async (dispatch) => {
  const { response } = await useApiHook(
    "PATCH",
    userData,
    `/users/${userData.user_id}`
  );

  if (response) {
    dispatch({ type: PUT_USERS, payload: userData });
    return true;
  } else {
    return false;
  }
};
/**
 * Delete engine data of given id
 * @param {string} id
 * @returns {boolean}
 */
export const deleteUserList = (id, isAdmin) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/users/${id}`);

  if (response) {
    dispatch({ type: DELETE_USERS, payload: id });
    return true;
  } else {
    return false;
  }
};
export const resetPassword = (details) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    details,
    "/backend/pwd-reset",
    backendResetPasswordValidation
  );
  if (response) {
    return true;
  } else return false;
};
export const activateUser = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    { email: data.email },
    "/activate"
  );

  if (response) {
    dispatch({ type: ACTIVATE_USER, payload: data });
    return true;
  } else {
    return false;
  }
};

export const deactivateUser = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    { email: data.email },
    "/deactivate"
  );

  if (response) {
    dispatch({ type: DEACTIVATE_USER, payload: data });
    return true;
  } else {
    return false;
  }
};
export const getRefundUserData = (id) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/refundbyuser/${id}`);
  if (response) {
    return response.data;
  } else return [];
};

export const patchUser = (userData, path) => async (dispatch, getState) => {
  const { users, id, user_id, phone_no, ...rest } = userData;
  const { userId, email } = getState().user;
  rest.phone_update = phone_no;

  const { response } = await useApiHook(
    "PATCH",
    rest,
    `/details/${userData.user_id || userId}`,
    patchUserValidatn
  );
  if (response) {
    if (path === "/profileform" || path === "/profile") {
      if (rest.phone_update) {
        if (await dispatch(resendOtp(email))) {
          userData = {
            ...getState().user,
            phoneNo: rest.phone_update,
          };

          addUserData(userData);
          dispatch({ type: LOG_IN, payload: userData });
          dispatch({ type: TWO_FA, payload: true });
        }
        return;
      }
      history.push("/");
    } else dispatch(getUserList());
    return true;
  } else return false;
};

export const userInvoices = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "GET",
    {},
    `/genrateinvoice/${data.id}`
  );
  if (response) {
    return true;
  } else return false;
};

export const billingDetailsForUser = (id) => async (dispatch, getState) => {
  const userId = id || getState().user.userId;
  const { response } = await useApiHook("GET", {}, `/billbyuser/${userId}`);
  if (response) {
    return response.data;
  } else return [];
};
