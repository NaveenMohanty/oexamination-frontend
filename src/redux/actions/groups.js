import {
    GET_ALL_PERMISSIONS,
    GET_GROUP_PERMISSIONS,
    CREATE_GROUP_PERMISSIONS,
    GET_TAG_GRP_PERMISSION,
    DELETE_GROUP_PERMISSIONS
} from "../types";
import useApiHook from "../../services/useApiHook";

/**
 * Redux actions for Groups
 * @module redux/actions/Groups
 */

/**
 * get all permissions.
 * @returns {void}
 */
export const getAllPermissions = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/permissions");

    if (response) {
        dispatch({ type: GET_ALL_PERMISSIONS, payload: response.data });
    }
};
/**
 * get group permissions.
 * @returns {void}
 */
export const getGroupPermissions = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/grppermissions");

    if (response) {
        dispatch({ type: GET_GROUP_PERMISSIONS, payload: response.data });
    }
};
/**
 * create group permissions post request.
 * @param {Object} grpPermissionData
 * @returns {boolean}
 */
export const createGroupPermissions = (grpPermissionData) => async (dispatch) => {
    const { response } = await useApiHook("POST", grpPermissionData, "/backend/grppermissions");

    if (response) {
        dispatch({ type: CREATE_GROUP_PERMISSIONS, payload: response });
        return true;
    } else {
        return false;
    }
};

export const deleteGroup = (id) => async (dispatch) => {
    const { response } = await useApiHook("DELETE", {}, `/backend/grppermissions/${id}`);
    if (response) {
      dispatch({ type: DELETE_GROUP_PERMISSIONS, payload: id });
    }
  };
  

/**
 * tag group with permission.
 * @returns {void}
 */
export const tagGroupPermission = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/permissionstag");

    if (response) {
        dispatch({ type: GET_TAG_GRP_PERMISSION, payload: response.data });
    }
};


