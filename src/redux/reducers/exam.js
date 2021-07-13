import {
  SET_HOST_UPCOMING_EXAM,
  SET_HOST_PAST_EXAM,
  SET_UPCOMING_EXAM,
  SET_PAST_EXAM,
  SET_CURR_EXAM,
} from "../types";

const initialState = {
  hostUpcoming: [],
  hostPast: [],
  upcoming: [],
  past: [],
  currentExam: {},
};

const examReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_HOST_UPCOMING_EXAM:
      return {
        ...state,
        hostUpcoming: payload,
      };

    case SET_HOST_PAST_EXAM:
      return {
        ...state,
        hostPast: payload,
      };
    case SET_UPCOMING_EXAM:
      return {
        ...state,
        upcoming: payload,
      };

    case SET_PAST_EXAM:
      return {
        ...state,
        past: payload,
      };
    case SET_CURR_EXAM:
      return {
        ...state,
        currentExam: payload,
      };

    default:
      return state;
  }
};

export default examReducer;
