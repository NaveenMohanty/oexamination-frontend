import {
  GET_ENGINES,
  POST_ENGINE,
  PUT_ENGINE,
  DELETE_ENGINE,
  LOG_OUT,
} from "../types";

const initialState = {
  engineList: [],
};

const engineReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ENGINES:
      return {
        ...state,
        engineList: payload,
      };

    case POST_ENGINE:
      return {
        ...state,
        engineList: [payload, ...state.engineList],
      };

    case PUT_ENGINE:
      return {
        ...state,
        engineList: [
          payload,
          ...state.engineList.filter((engine) => engine.id !== payload.id),
        ],
      };

    case DELETE_ENGINE:
      return {
        ...state,
        engineList: state.engineList.filter((engine) => engine.id !== payload),
      };

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default engineReducer;
