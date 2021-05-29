import {
  GET_IMAGE,
  POST_IMAGE,
  PUT_IMAGE,
  GET_TEXT,
  POST_TEXT,
  PUT_TEXT,
} from "../types";
import useApiHook from "../../services/useApiHook";

const b64toBlob = async (base64, type = 'application/octet-stream') => {
  const res = await fetch(`data:${type};base64,${base64}`);
  return res.blob();
}

/**
 * get Image data for image management.
 * @returns {void}
 */
export const getImage = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/image");
  if (response) {
    const data = [];
    for (let index = 0; index < response.data.length; index++) {
      const v = response.data[index];
      const blob = await b64toBlob(v['meta_data'], "image/png");
      data.push({ ...v, blob });
    }
    dispatch({ type: GET_IMAGE, payload: data });
  }
};
/**
 * add image data in image management.
 * @param {Object} imageData
 * @returns {boolean}
 */
export const postImage = (imageData) => async (dispatch) => {
  let formData = new FormData();

  if (imageData.files) {
    Object.keys(imageData).forEach((key) => {
      formData.append(key, imageData[key]);
    });
  }
  else {
    formData = imageData;
  }
  const { response } = await useApiHook("POST", formData, "/image");

  if (response) {
    // dispatch({ type: POST_IMAGE, payload: response });
    dispatch(getImage());
    return true;
  } else {
    return false;
  }
};
/**
 * update image in image management
 * @param {Object} imageData
 * @returns {boolean}
 */
export const putImage = (imageData) => async (dispatch) => {
  let formData = new FormData();

  const { id, ...rest } = imageData

  if (rest.files) {
    Object.keys(rest).forEach((key) => {
      formData.append(key, rest[key]);
    });
  }
  else {
    formData = rest;
  }

  const { response } = await useApiHook(
    "PATCH",
    formData,
    `/image/${id}`
  );

  if (response) {
    dispatch(getImage());
    return true;
  } else {
    return false;
  }
};
/*****************************************************************************************************/

/**
 * get text data for text management.
 * @returns {void}
 */
export const getText = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/textadd");

  if (response) {
    dispatch({ type: GET_TEXT, payload: response.data });
  }
};
/**
 * add text data in text management.
 * @param {Object} textData
 * @returns {boolean}
 */
export const postText = (textData) => async (dispatch) => {
  const { response } = await useApiHook("POST", textData, "/textadd");

  if (response) {
    dispatch(getText());
    return true;
  } else {
    return false;
  }
};
/**
 * update text in text management
 * @param {Object} textData
 * @returns {boolean}
 */
export const putText = (textData) => async (dispatch) => {
  const { response } = await useApiHook(
    "PATCH",
    textData,
    `/textadd/${textData.id}`
  );

  if (response) {
    dispatch({ type: PUT_TEXT, payload: textData });
    return true;
  } else {
    return false;
  }
};
