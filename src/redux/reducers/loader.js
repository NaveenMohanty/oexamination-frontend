import { SET_LOADING, UNSET_LOADING } from "../types";

const initialState = 0;

const loaderReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SET_LOADING:
      return state + 1;

    case UNSET_LOADING:
      return state - 1;

    default:
      return state;
  }
};

export default loaderReducer;
