import {
  GET_USER_FILES,
  GET_FILES,
  DELETE_FILE,
  CONFIRM_FILES,
  GET_SINGLE_FILE,
} from "../types";
import useApiHook from "../../services/useApiHook";
/**
 * Redux actons for file apis call
 * @module redux/actions/files
 */

/**
 * get all the files present on server
 * @returns {void}
 */
// get all the files present on server
export const getFiles = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/uploadfile");

  console.log("files: ", response.data)
  if (response) {
    const data = response.data.reduce((prev, curr) => {
      if (curr.models) {
        prev.push({ ...curr, type: curr.models.name });
      }
      if (curr.queries) {
        prev.push({ ...curr, type: curr.queries.name });
      }

      return prev;
    }, []);

    console.log(data);

    dispatch({ type: GET_FILES, payload: data });
  }
};
/**
 * get files specific to user currently logged in
 * @returns {void}
 */
// get files specific to user currently logged in
export const getUserFiles = () => async (dispatch, getState) => {
  const userId = getState().user.userId;
  const { response } = await useApiHook("GET", {}, `/uploadFile/${userId}`);

  if (response) {
    dispatch({ type: GET_USER_FILES, payload: response.data });
  }
};
/**
 * convert files to json data on backend server
 * @param {Array} filesData
 * @returns {boolean}
 */
// convert files to json data on backend server
export const uploadfiles = (filesData) => async (dispatch, getState) => {
  const userId = getState().user.userId;

  let formData = new FormData();
  formData.append("user_id", userId);
  filesData.forEach((file) => {
    formData.append("file", file);
  });

  const { response } = await useApiHook("POST", formData, "/uploadfile");
  if (response) {
    response.data.forEach((file) => {
      file.json_str = JSON.parse(file.json_str);
    });
    // dispatch({ type: UPLOAD_FILES, payload: response.data });
    return response.data;
  } else {
    return false;
  }
};

// output files
export const outputFiles = (fileData) => async (dispatch, getState) => {

  const formData = new FormData();

  formData.append("input_file_id", fileData['input_file_id']);
  formData.append("file", fileData.file);

  const { response } = await useApiHook("POST", formData, "/output-file");
  if (response) {
    return true;
  } else {
    return false;
  }
};
/**
 * upload files on server
 * @param {Object} data
 * @returns {boolean}
 */
// upload files on server
export const confirmfiles = (data, engine_name) => async (dispatch, getState) => {
  const user_id = getState().user.userId;
  const details = {
    user_id,
    data,
    engine_name
  };

  const { response } = await useApiHook("POST", details, "/uploadfile/confirm");
  if (response) {
    dispatch({ type: CONFIRM_FILES, payload: response.data });
    return response.data;
  } else {
    return [];
  }
};

///
export const tagFiles = (fileId, data) => async (dispatch, getState) => {
  const { response } = await useApiHook("PATCH", data, `/uploadfile/${fileId}`);
  if (response) {
    return true;
  } else {
    return false;
  }
};

/**
 * delete the files from server of given id
 * @param {String} fileId
 * @returns {boolean}
 */
// delete the files from server
export const deleteFile = (fileId) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/uploadfile/${fileId}`);
  if (response) {
    dispatch({ type: DELETE_FILE, payload: fileId });
    return true;
  } else {
    return false;
  }
};

/**
 * get file data on when onRowClick on File Table
 * @param {String} Id
 * @returns {void}
 */
// get all the files present on server
export const getSingleFile = (Id) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/files/${Id}`);
  if (response) {
    dispatch({ type: GET_SINGLE_FILE, payload: JSON.parse(response.data) });
  }
};

export const downloadFile = (id, name) => async (dispatch) => {

  const url = process.env.NODE_ENV === "production"
  ? process.env.REACT_APP_BASE_URL_PROD
  : process.env.REACT_APP_BASE_URL_DEV;

    const link = document.createElement("a");
    link.href = `${url}/download-file/${id}`;
    link.setAttribute("download", name);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
};
