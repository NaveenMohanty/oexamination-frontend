import {
  GET_ROLE,
  POST_ROLE,
  GET_ROLE_GROUPTAG,
  PUT_ROLE,
  POST_ROLE_GROUPTAG,
  GET_ASSIGN_ROLE,
  POST_ASSIGN_ROLE,
  DELETE_ROLE,
} from "../types";
import useApiHook from "../../services/useApiHook";
import { getBackendUsers } from "./backendUsers";
import permissionCheck from "../../services/usePermissionCheck";

/**
 * Redux actions for Roles
 * @module redux/actions/Roles
 */

/**
 * get Role data.
 * @returns {void}
 */
//  const { response } = permissionCheck("role_view") ? await useApiHook("GET", {}, "/backend/role") : { response: false }
export const getRole = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/role");

  if (response) {
    dispatch({ type: GET_ROLE, payload: response.data });
  }
};
/**
 * Role data post request.
 * @param {Object} RoleData
 * @returns {boolean}
 */
export const addRole = (roleData) => async (dispatch) => {
  const { subGroups, ...rest } = roleData;
  const { response } = await useApiHook("POST", rest, "/backend/role");

  if (response && response.data) {
    if (subGroups.length) {
      for (let index = 0; index < subGroups.length; index++) {
        const id = subGroups[index];
        await dispatch(
          addRoleSubGroupTag({
            role_id: response.data.id,
            subgrouptag_id: id,
          })
        );
      }
    }
    dispatch(getRole());
    return true;
  } else {
    return false;
  }
};

export const editRole = (roleData, prevIds) => async (dispatch) => {
  const { subGroups, id, ...rest } = roleData;
  const { response } = await useApiHook("PATCH", rest, `/backend/role/${id}`);

  if (response) {
    const idxAdded = subGroups.filter(v => !prevIds.find(key => key.value === v));
    const idxRemoved = prevIds.filter(v => !subGroups.find(key => key === v.value));

    for (let index = 0; index < idxAdded.length; index++) {
      const idx = idxAdded[index];
      await dispatch(
        addRoleSubGroupTag({
          role_id: id,
          subgrouptag_id: idx,
        })
      );
    }

    for (let index = 0; index < idxRemoved.length; index++) {
      const idx = idxRemoved[index];
      await dispatch(
        deleteRoleSubGroupTag(idx.id)
      )
    }

    dispatch(getRole());
    return true;
  } else {
    return false;
  }
};

export const deleteRole = (id) => async (dispatch) => {
  const { response } = await useApiHook("DELETE", {}, `/backend/role/${id}`);

  if (response) {
    dispatch({ type: DELETE_ROLE, payload: id });
  }
};

/**
 * get Roles data with permission grp tag.
 * @returns {void}
 */
export const getRoleGroupTag = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/rolegrouptag");

  if (response) {
    dispatch({ type: GET_ROLE_GROUPTAG, payload: response.data });
  }
};
/**
 * Role data with permission grp tag post request.
 * @param {Object} RoleGrpTagData
 * @returns {boolean}
 */
export const addRoleGroupTag = (RoleGrpTagData) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    RoleGrpTagData,
    "/backend/rolegrouptag"
  );

  if (response) {
    return true;
  } else {
    return false;
  }
};

export const addRoleSubGroupTag = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    data,
    "/backend/rolesubgrouptag"
  );

  if (response) {
    return true;
  } else {
    return false;
  }
};

export const deleteRoleSubGroupTag = (id) => async (dispatch) => {
  const { response } = await useApiHook(
    "DELETE",
    {},
    `/backend/rolesubgrouptag/${id}`
  );

  if (response) {
    return true;
  } else {
    return false;
  }
};

// permissionCheck("rolesubgrouptagging_view") //////////////////////////////
export const getRoleSubGroupTag = (id) => async (dispatch) => {
  const { response } = await useApiHook(
    "GET",
    {},
    `/backend/rolesubgrouptag/${id}`
  );

  if (response) {
    return response.data;
  } else {
    return false;
  }
};

/**
 * get assigned role from server.
 * @returns {void}
 */
// permissionCheck("assignrole_view") ////////////////////////////////////////
export const getAssignedRole = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/assignrole");

  if (response) {
    dispatch({ type: GET_ASSIGN_ROLE, payload: response.data });
  }
};
/**
 * Assign Role to users post request.
 * @param {Object} assignRole
 * @returns {boolean}
 */
export const assignRoleToUsers = (data) => async (dispatch) => {

  const { id, ...rest } = data;
  const { response } = await useApiHook(
    "PATCH",
    rest,
    `/backend/assignrole/${id}`
  );

  if (response) {
    dispatch(getBackendUsers());
    return true;
  } else {
    return false;
  }
};
