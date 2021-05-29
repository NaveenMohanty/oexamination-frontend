import { GET_SERVICES, PUT_SERVICE, DELETE_SERVICE, CURRENT_SERVICE } from "../types";
import useApiHook from "../../services/useApiHook";
import { serviceValidation } from "../../validation";

/**
 * Redux actons for service table data
 * @module redux/actions/service
 */

/**
 * Gets service table data
 * @returns {void}
 */
export const getServiceList = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/serviceplans");

  if (response) {
    const data = response.data.map(service => {
      const details = {...service};
      details['feature'] = details['feature'] ? JSON.parse(details['feature']) : null;
      return details;
    })

    dispatch({ type: GET_SERVICES, payload: data });
  }
};

/**
 * Add new service data to list
 * @param {Array} serviceData
 * @returns {boolean}
 */
export const addService = (serviceData) => async (dispatch) => { 

  const { features, ...rest } = serviceData;
  rest['feature'] = JSON.stringify(features);

  const { response } = await useApiHook(
    "POST",
    rest,
    "/backend/serviceplans",
    serviceValidation
  );

  if (response) {
    dispatch(getServiceList());
    return true;
  } else {
    return false;
  }
};

/**
 * Edited service table data
 * @param {Array} serviceData
 * @returns {boolean}
 */
export const editService = (serviceData) => async (dispatch) => {

  const { features, ...rest } = serviceData;
  rest['feature'] = JSON.stringify(features);

  console.log(rest);
  const { response } = await useApiHook(
    "PATCH",
    rest,
    `/backend/serviceplans/${serviceData.id}`,
    serviceValidation
  );

  rest['feature'] = features;

  if (response) {
    dispatch({ type: PUT_SERVICE, payload: rest });
  }
};

/**
 * Delete service data of given id
 * @param {string} id
 * @returns {boolean}
 */
export const deleteService = (id) => async (dispatch) => {
  const { response } = await useApiHook(
    "DELETE",
    {},
    `/backend/serviceplans/${id}`
  );

  if (response) {
    dispatch({ type: DELETE_SERVICE, payload: id });
    return true;
  } else {
    return false;
  }
};

export const tagUserToSubscription = (plan_id) => async (dispatch, getState) => {
  const user_id = getState().user.userId;

  const { response } = await useApiHook(
    "PATCH",
    { user_id, plan_id },
    `/subscribe/${user_id}`
  );

  if (response) {
    return true;
  } else {
    return false;
  }
};


export const userSubscription = () => async (dispatch, getState) => {
  const user_id = getState().user.userId;
  const { response } = await useApiHook(
    "GET",
    {},
    `/subscribe/${user_id}`
  );

  if (response) {
    dispatch({ type: CURRENT_SERVICE, payload: response.data });
    return response.data;
  } else {
    return false;
  }
};
