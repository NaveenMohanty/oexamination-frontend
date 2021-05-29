import {
  GET_ALL_PERMISSIONS,
  CREATE_GROUP_PERMISSIONS,
  GET_GROUP_PERMISSIONS,
  DELETE_GROUP_PERMISSIONS,
  GET_TAG_GRP_PERMISSION,
  GET_SUBGROUPS,
  CREATE_SUBGROUP,
  TAG_PERMISSION_WITH_SUBGROUP,
  TAG_SUBGRP_WITH_GROUP,
  GET_RELATIONSHIP_TREE,
} from "../types";
import apiHook from "../../services/useApiHook";
import permissionCheck from "../../services/usePermissionCheck";

// const { response } = permissionCheck("permissions_view") ? await apiHook("GET", {}, "/backend/permissions") : { response: false }
export const getAllPermissions = () => async (dispatch) => {
  const { response } = await apiHook("GET", {}, "/backend/permissions");

  if (response) {
    // const data = response.data.reduce((prev, curr) => {
    //   if (!prev[curr.category]) {
    //     prev[curr.category] = [curr];
    //   } else {
    //     prev[curr.category].push(curr);
    //   }
    //   return curr;
    // }, {});
    // console.log(data);
    dispatch({ type: GET_ALL_PERMISSIONS, payload: response.data });
  }
};

// const { response } = permissionCheck("permissiongroups_view") ? await apiHook("GET", {}, "/backend/grppermissions") : { response: false }
export const getGroupPermissions = () => async (dispatch) => {
  const { response } = await apiHook("GET", {}, "/backend/grppermissions");

  if (response) {
    dispatch({ type: GET_GROUP_PERMISSIONS, payload: response.data });
  }
};

export const createGroupPermissions = (data) => async (dispatch) => {
  for (let index = 0; index < data.length; index++) {
    const group = data[index];

    if (group.name) {
      const { response } = await apiHook(
        "POST",
        group,
        "/backend/grppermissions"
      );
    }

    dispatch(getRelationshipTree());
  }

  return true;
};

export const editGroupPermissions = (data) => async (dispatch) => {
  const { response } = await apiHook(
    "PATCH",
    { name: data.name },
    `/backend/grppermissions/${data.id}`
  );

  if (response) {
    dispatch(getRelationshipTree());
    return true;
  } else {
    return false;
  }
};

export const deleteGroupPermissions = (groupId) => async (dispatch) => {
  const { response } = await apiHook(
    "DELETE",
    {},
    `/backend/grppermissions/${groupId}`
  );

  if (response) {
    dispatch(getRelationshipTree());
  }
};

export const getRelationshipTree = () => async (dispatch) => {
  const { response } = await apiHook("GET", {}, "/backend/relationsg");

  if (response) {
    dispatch({ type: GET_RELATIONSHIP_TREE, payload: response.data });
  }
};

export const deleteGroup = (id) => async (dispatch) => {
  const { response } = await apiHook(
    "DELETE",
    {},
    `/backend/grppermissions/${id}`
  );
  if (response) {
    dispatch({ type: DELETE_GROUP_PERMISSIONS, payload: id });
  }
};

/**
 * tag group with permission.
 * @returns {void}
 */
export const tagGroupPermission = () => async (dispatch) => {
  const { response } = await apiHook("GET", {}, "/backend/permissionstag");

  if (response) {
    dispatch({ type: GET_TAG_GRP_PERMISSION, payload: response.data });
  }
};
/***************************************************************************************/
/**
 * get subgroup list
 * @returns {void}
 */
//  const { response } = permissionCheck("subgrouppermissions_view") ? await apiHook("GET", {}, "/backend/subgrppermissions") : { response: false }
export const getSubgroups = () => async (dispatch) => {
  const { response } = await apiHook("GET", {}, "/backend/subgrppermissions");

  if (response) {
    dispatch({ type: GET_SUBGROUPS, payload: response.data });
  }
};
/**
 * create subgroup
 * @param {Object} subGrpData
 * @returns {boolean}
 */
export const createSubGroup = (data, groupId) => async (dispatch) => {
  const { name, permissions, value } = data;
  const { response } = await apiHook(
    "POST",
    { name, value },
    "/backend/subgrppermissions"
  );
  if (response && response.data) {
    for (let index = 0; index < permissions.length; index++) {
      const permission_id = permissions[index];
      await dispatch(
        tagPermissionWithSubGrp({
          permission_id,
          subgroup_id: response.data.id,
        })
      );
    }

    if (await dispatch(tagsubGroupWithGroup(response.data.id, groupId))) {
      dispatch(getRelationshipTree());
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const editSubGroup = (data) => async (dispatch) => {
  const { name, value, id } = data;
  const { response } = await apiHook(
    "PATCH",
    { name, value },
    `/backend/subgrppermissions/${id}`
  );

  if (response) {
    dispatch(getRelationshipTree());
    return true;
  }

  return false;
};

export const deleteSubGroup = (subGroupId) => async (dispatch) => {
  const { response } = await apiHook(
    "DELETE",
    {},
    `/backend/subgrppermissions/${subGroupId}`
  );

  if (response) {
    dispatch(getRelationshipTree());
  }
};

/**
 * tag permissions with subgroups
 * @param {Object} tagIDs
 * @returns {boolean}
 */
export const tagPermissionWithSubGrp = (data) => async (dispatch) => {
  const { response } = await apiHook(
    "POST",
    data,
    "/backend/subgrptaggingpermissions"
  );

  if (response) {
    return true;
  } else {
    return false;
  }
};
/**
 * tag sub groups with respective groups
 * @param {Object} tagIDs
 * @returns {boolean}
 */
export const tagsubGroupWithGroup =
  (subgrouptag_id, group_id) => async (dispatch) => {
    const { response } = await apiHook(
      "POST",
      {
        subgrouptag_id,
        group_id,
      },
      "/backend/grpsubtag"
    );

    if (response) {
      return true;
    } else {
      return false;
    }
  };
