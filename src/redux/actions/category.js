import {
  GET_CATEGORIES,
  POST_CATEGORY,
  PUT_CATEGORY,
  DELETE_CATEGORY,
} from "../types";
import useApiHook from "../../services/useApiHook";

/**
 * Redux actons for categorys
 * @module redux/actions/categorys
 */

/**
 * get Category data for the table.
 * @returns {void}
 */
export const getCategoryList = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/category");

  if (response) {
    dispatch({ type: GET_CATEGORIES, payload: response.data });
  }
};
/**
 * Category data added to the table.
 * @param {Object} categoryData
 * @returns {boolean}
 */
export const addCategory = (categoryData) => async (dispatch) => {
  const { response } = await useApiHook("POST", categoryData, "/backend/category");

  if (response) {
    dispatch(getCategoryList());
    return true;
  } else {
    return false;
  }
};
/**
 * Edited Category data
 * @param {Object} categoryData
 * @returns {boolean}
 */
export const editCategory = (categoryData) => async (dispatch) => {
  const { response } = await useApiHook(
    "PATCH",
    categoryData,
    `/backend/category/${categoryData.id}`
  );

  if (response) {
    dispatch({ type: PUT_CATEGORY, payload: categoryData });
    return true;
  } else {
    return false;
  }
};

export const changeCategoryStatus = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "PATCH",
    { enable: data.enable },
    `/backend/category/${data.id}`
  );

  if (response) {
    dispatch({ type: PUT_CATEGORY, payload: data });
    return true;
  } else {
    return false;
  }
};
/**
 * Delete category of given id
 * @param {string} id
 * @returns {boolean}
 */
export const deleteCategory = (id) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/backend/category/${id}`);

  if (response) {
    dispatch({ type: DELETE_CATEGORY, payload: id });
    return true;
  } else {
    return false;
  }
};
