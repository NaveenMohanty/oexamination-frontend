import { GET_QUERIES, PUT_QUERY, DELETE_QUERY } from "../types";
import { confirmfiles, tagFiles } from "./file";
import useApiHook from "../../services/useApiHook";
/**
 * Redux actons for query table
 * @module redux/actions/query
 */

/**
 * Get Query Table data
 * @returns {void}
 */
export const getQueryList = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/query");

  if (response) {
    response.data = response.data.map((query) => ({
      ...query,
      models: query.models.name,
    }));
    dispatch({ type: GET_QUERIES, payload: response.data });
  }
};
/**
 * Add query data to table
 * @param {Array} queryData
 * @returns {boolean}
 */
export const addQuery = (queryData, fileData) => async (dispatch, getState) => {

  const { engine_name, ...rest } = queryData;

  let filesData = fileData.map((file) => {
    let { filename, json_str } = file;
    json_str = JSON.stringify(json_str);

    return {
      filename,
      json_str,
    };
  });

  const fileIds = await dispatch(confirmfiles(filesData, engine_name));
  if (fileIds.length) {
    const user_id = getState().user.userId;
    const details = {
      ...rest,
      user_id,
    };
    const { response } = await useApiHook("POST", details, "/query");
    if (response) {
      for (let index = 0; index < fileIds.length; index++) {
        const data = await dispatch(
          tagFiles(fileIds[index], { query_id: response.data.query_id })
        );
        if (!data) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
/**
 * Edited query data
 * @param {Array} queryData
 * @returns {boolean}
 */
export const editQuery = (queryData) => async (dispatch) => {
  const { response } = await useApiHook(
    "PUT",
    queryData,
    `/query/${queryData.id}`
  );

  if (response) {
    dispatch({ type: PUT_QUERY, payload: queryData });
    return true;
  } else {
    return false;
  }
};
/**
 * Delete query data of given id
 * @param {string} id
 * @returns {boolean}
 */
export const deleteQuery = (id) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/query/${id}`);

  if (response) {
    dispatch({ type: DELETE_QUERY, payload: id });
    return true;
  } else {
    return false;
  }
};
