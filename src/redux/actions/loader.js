import { SET_LOADING, UNSET_LOADING } from "../types";

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

export const unSetLoading = () => async (dispatch) => {
  dispatch({
    type: UNSET_LOADING,
  });
};
