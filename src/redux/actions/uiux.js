import {
    GET_UI_UX,
    EDIT_UI_UX,
} from "../types";
import useApiHook from "../../services/useApiHook";

/**
 * Redux actons for UI/UX
 * @module redux/actions/uiux
 */

/**
 * get ui ux list from api
 * @returns {void}
 */
export const getUIUX = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/html-element");

    if (response) {
        dispatch({ type: GET_UI_UX, payload: response.data });
    }
};
/**
 * post UI/UX
 * @param {Object} data
 * @returns {boolean}
 */
export const postUIUX = (data) => async (dispatch) => {
    const { response } = await useApiHook("POST", data, "/backend/html-element");

    if (response) {
        dispatch(getUIUX());
        return true;
    } else {
        return false;
    }
};
/**
 * Edit UI/UX
 * @param {Object} data
 * @returns {boolean}
 */
export const editUIUX = (data) => async (dispatch) => {
    const { response } = await useApiHook(
        "PATCH",
        data,
        `/backend/html-element/${data.id}`
    );

    if (response) {
        dispatch(getUIUX());
        return true;
    } else {
        return false;
    }
};
/**
 * Delete UI/UX
 * @param {string} id
 * @returns {boolean}
 */
export const deleteUIUX = (id) => async (dispatch) => {
    const { response } = await useApiHook("DELETE", {}, `/backend/html-element/${id}`);

    if (response) {
        dispatch(getUIUX());
        return true;
    } else {
        return false;
    }
};

export const getResNotification = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/res-notification");

    if (response) {
        return response.data;
    }
};

export const editResNotification = (data) => async (dispatch) => {

    const { id, ...rest } = data;

    const { response } = await useApiHook(
        "PATCH",
        rest,
        `/backend/res-notification/${id}`
    );

    if (response) {
        dispatch(getResNotification());
        return true;
    } else {
        return false;
    }
};