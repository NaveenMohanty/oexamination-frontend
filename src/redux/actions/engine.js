import { GET_ENGINES, POST_ENGINE, PUT_ENGINE, DELETE_ENGINE } from "../types";
import useApiHook from "../../services/useApiHook";
// import fetch from "isomorphic-fetch";
/**
 * Redux actons for engine table data
 * @module redux/actions/engine
 */

/**
 * Gets engin table data
 * @returns {void}
 */
export const getEngineList = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/engine");

  if (response) {
    response.data = response.data.map((engine) => ({
      ...engine,
      categories: engine.categories.name,
    }));
    dispatch({ type: GET_ENGINES, payload: response.data });
  }
};
/**
 * Add new engin data to list
 * @param {Array} engineData
 * @returns {boolean}
 */
export const addEngine = (engineData) => async (dispatch) => {
  const { response } = await useApiHook("POST", engineData, "/backend/engine");

  if (response) {
    dispatch(getEngineList());
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
export const editEngine = (engineData) => async (dispatch) => {
  const { enable, name, description, category_id, price } = engineData;
  const details = {
    enable,
    name,
    description,
    price,
    category_id,
  };

  const { response } = await useApiHook(
    "PATCH",
    details,
    `/backend/engine/${engineData.id}`
  );

  if (response) {
    dispatch({ type: PUT_ENGINE, payload: engineData });
    return true;
  } else {
    return false;
  }
};

export const changeEngineStatus = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "PATCH",
    { enable: data.enable },
    `/backend/engine/${data.id}`
  );

  if (response) {
    dispatch({ type: PUT_ENGINE, payload: data });
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
export const deleteEngine = (id) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/backend/engine/${id}`);

  if (response) {
    dispatch({ type: DELETE_ENGINE, payload: id });
    return true;
  } else {
    return false;
  }
};

export const uploadPyForEngine = (formData) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    formData,
    `/backend/enginecode`
  );
  console.log(response);
  if (response) {
    console.log(response);
    return true;
  } else {
    return false;
  }
};

export const getPyForEngine = (engineName) => async (dispatch) => {
  console.log(engineName);
  const { response } = await useApiHook(
    "GET",
    {},
    `/backend/enginecode?engine_name=${engineName}`
  );
  console.log("Res::::", response);
  if (response) {
    console.log(response);
    return response;
  } else {
    console.log(response);
    return "";
  }
};

export const uploadReqForEngine = (formData) => async (dispatch) => {
  const { response } = await useApiHook("POST", formData, `/backend/enginereq`);
  console.log(response);
  if (response) {
    console.log(response);
    return true;
  } else {
    return false;
  }
};

export const getReqForEngine = (engineName) => async (dispatch) => {
  console.log(engineName);
  const { response } = await useApiHook(
    "GET",
    {},
    `/backend/enginereq?engine_name=${engineName}`
  );
  if (response) {
    console.log(response);
    return response;
  } else {
    return "";
  }
};

export const uploadDesForEngine = (formData) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    formData,
    `/backend/enginedesc`
  );
  console.log(response);
  if (response) {
    console.log(response);
    return true;
  } else {
    return false;
  }
};

export const getDesForEngine = (engineName) => async (dispatch) => {
  console.log(engineName);
  const { response } = await useApiHook(
    "GET",
    {},
    `/backend/enginedesc?engine_name=${engineName}`
  );
  if (response) {
    console.log(response);
    return response;
  } else {
    return "";
  }
};
export const getEngineLogs = (id) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/backend/enginelogs/${id}`);

  if (response) {
    return response.data;
  } else {
    return false;
  }
};


export const getEngineDesc = (enginename) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/backend/enginedesc?engine_name=${enginename}`);

  if (response) {
    return response.data;
  } else {
    return false;
  }
};