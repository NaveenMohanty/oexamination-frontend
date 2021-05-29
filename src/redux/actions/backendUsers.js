import {
  GET_ADMIN_USERS,
  POST_ADMIN_USER,
  PUT_ADMIN_USER,
  DELETE_ADMIN_USER,
  ACTIVATE_ADMIN_USER,
  DEACTIVATE_ADMIN_USER,
} from "../types";
import useApiHook from "../../services/useApiHook";
import { backendUserAddValidation, backendUserEditValidation } from "../../validation";
import { resetPassword } from './userList';

/**
 * Redux actons for engine table data
 * @module redux/actions/userList
 */

/**
 * Gets engin table data
 * @returns {void}
 */
export const getBackendUsers = (page, rows) => async (dispatch) => {
  const { response } = await useApiHook(
    "GET",
    {},
    `/backusers?page=${page + 1}&rows=${rows}`
  );

  if (response) {
    dispatch({ type: GET_ADMIN_USERS, payload: response.data });
  }
};

// /**
//  * Add new user  to list
//  * @param {Array} userList
//  * @returns {boolean}
//  */
export const addBackendUser = (userData) => async (dispatch) => {
  const { response } = await useApiHook("POST", userData, "/admin-registration", backendUserAddValidation);

  if (response) {
    dispatch(getBackendUsers());
    return true;
  } else {
    return false;
  }
};
// /**
//  * Edited engine table data
//  * @param {Array} engineData
//  * @returns {boolean}
//  */
export const editBackendUser = (userData) => async (dispatch) => {

  const { first_name, password, id } = userData;
  const { response } = await useApiHook(
    "PATCH",
    { first_name },
    `/backusers/${id}`,
    backendUserEditValidation
  );

  if (response) {
    if (password) {
      if (await dispatch(resetPassword({ password, user_id: id }))) {
        dispatch(getBackendUsers());
        return true;
      }
      else return false;
    }

    dispatch(getBackendUsers());
    return true;
  } else {
    return false;
  }
};
// /**
//  * Delete engine data of given id
//  * @param {string} id
//  * @returns {boolean}
//  */
export const deleteBackendUser = (id) => async (dispatch) => {
  console.log(id);
  const { response } = await useApiHook("DELETE", {}, `/backusers/${id}`);

  console.log(response);
  if (response) {
    dispatch({ type: DELETE_ADMIN_USER, payload: id });
    return true;
  } else {
    return false;
  }
};

// export const activateUser = (data) => async (dispatch) => {
//   const { response } = await useApiHook(
//     "POST",
//     { email: data.email },
//     "/backusers/activate"
//   );

//   if (response) {
//     dispatch({ type: ACTIVATE_ADMIN_USER, payload: data });
//     return true;
//   } else {
//     return false;
//   }
// };

// export const deactivateUser = (data) => async (dispatch) => {
//   const { response } = await useApiHook(
//     "POST",
//     { email: data.email },
//     "/backusers/deactivate"
//   );

//   if (response) {
//     dispatch({ type: DEACTIVATE_ADMIN_USER, payload: data });
//     return true;
//   } else {
//     return false;
//   }
// };

// export const billingDetailsForUser = (userId) => async (dispatch) => {
//   const { response } = await useApiHook("GET", {}, `/billbyuser/${userId}`);
//   if (response) {
//     return response.data;
//   } else return [];
// };
