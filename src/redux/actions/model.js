import { GET_MODELS, PUT_MODEL, DELETE_MODEL } from "../types";
import { confirmfiles, tagFiles, outputFiles } from "./file";
import useApiHook from "../../services/useApiHook";
/**
 * Redux actons for model table data
 * @module redux/actions/model
 */

/**
 * get model list data for modal table
 * @returns {void}
 */
// get model list
export const getModelList = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/model");

  if (response) {
    response.data = response.data.map((model) => ({
      ...model,
      engines: model.engines.name,
    }));
    dispatch({ type: GET_MODELS, payload: response.data });
  }
};
/**
 * Add filtered Model data
 * @param {Array} modelData
 * @param {Array} fileData
 * @returns {boolean}
 */
// add model
export const addModel =
  (modelData, fileData, formData) => async (dispatch, getState) => {

    const { engine_name, ...rest } = modelData;

    let filesData = fileData.map((file) => {
      let { filename, json_str, column_data_type } = file;
      json_str = JSON.stringify(json_str);
      return {
        filename,
        json_str,
        column_data_type: JSON.stringify(column_data_type),
      };
    });

    const fileIds = await dispatch(confirmfiles(filesData,  engine_name));

    if (fileIds.length) {
      const user_id = getState().user.userId;
      const details = {
        ...modelData,
        user_id,
      };

      const { response } = await useApiHook("POST", details, "/model");
      if (response) {
        for (let index = 0; index < fileIds.length; index++) {
          const data = await dispatch(
            tagFiles(fileIds[index], { model_id: response.data.model_id })
          );
          if (!data) {
            return false;
          }
        }

        // for (let index = 0; index < fileIds.length; index++) {
        //   console.log(formData[index]);
        //   const data = await dispatch(
        //     outputFiles({ input_file_id: fileIds[index], file: formData[index] })
        //   );
        //   if (!data) {
        //     return false;
        //   }
        // }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
/**
 * Edited model data
 * @param {Array} modelData
 * @returns {boolean}
 */
// edit model
export const editModel = (modelData) => async (dispatch) => {
  const { response } = await useApiHook(
    "PUT",
    modelData,
    `/model/${modelData.id}`
  );
  if (response) {
    dispatch({ type: PUT_MODEL, payload: modelData });
    return true;
  } else {
    return false;
  }
};
/**
 * Model data deletd of given id
 * @param {string} id
 * @returns {boolean}
 */
// delete model
export const deleteModel = (id) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/model/${id}`);
  if (response) {
    dispatch({ type: DELETE_MODEL, payload: id });
    return true;
  } else {
    return false;
  }
};
