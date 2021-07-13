import {
  SET_HOST_UPCOMING_EXAM,
  SET_HOST_PAST_EXAM,
  SET_UPCOMING_EXAM,
  SET_PAST_EXAM,
  SET_CURR_EXAM,
} from "../types";
import axiosHook from "../../axios";
import { getUser } from "../../utils/localStorage";

export const getHostUpcoming = () => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/exam/hosted/upcoming/${user._id}`
  );
  if (!error) {
    dispatch({
      type: SET_HOST_UPCOMING_EXAM,
      payload: response.data.sort(
        (a, b) => Date.parse(a.startingtime) - Date.parse(b.startingtime)
      ),
    });
    return true;
  } else {
    return false;
  }
};

export const getHostpast = (details) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(`/exam/hosted/past/${user._id}`);
  if (!error) {
    dispatch({
      type: SET_HOST_PAST_EXAM,
      payload: response.data.sort(
        (a, b) => Date.parse(b.startingtime) - Date.parse(a.startingtime)
      ),
    });
    return true;
  } else {
    return false;
  }
};

export const getUserUpcoming = () => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(`/user/upcomingexam/${user._id}`);
  if (!error) {
    dispatch({
      type: SET_UPCOMING_EXAM,
      payload: response.data.sort(
        (a, b) => Date.parse(a.startingtime) - Date.parse(b.startingtime)
      ),
    });
    return true;
  } else {
    return false;
  }
};

export const getUserAttaineded = () => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(`/user/examattained/${user._id}`);
  if (!error) {
    dispatch({
      type: SET_PAST_EXAM,
      payload: response.data.sort(
        (a, b) => Date.parse(b.startingtime) - Date.parse(a.startingtime)
      ),
    });
    return true;
  } else {
    return false;
  }
};

export const createExam = (details) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/exam/${user._id}`,
    "POST",
    details
  );
  if (!error) {
    return true;
  } else {
    return false;
  }
};

export const getExam = (examid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(`/exam/${examid}/${user._id}`);
  if (!error) {
    dispatch({
      type: SET_CURR_EXAM,
      payload: response.data,
    });
    return response.data;
  } else {
    return false;
  }
};

export const editExam = (details, examid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/exam/${examid}/${user._id}`,
    "PUT",
    details
  );
  if (!error) {
    return true;
  } else {
    return false;
  }
};

export const getUserList = () => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(`/all/user/${user._id}`);
  if (!error) {
    return response.data.filter((v) => String(v._id) !== String(user._id));
  } else {
    return false;
  }
};

export const deleteExam = (examid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/exam/delete/${examid}/${user._id}`,
    "DELETE"
  );
  if (!error) {
    return true;
  } else {
    return false;
  }
};

export const createAnswer = (examid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(`/answer/${user._id}/${examid}`);
  if (!error) {
    return response.data;
  } else {
    return false;
  }
};

export const editAnswer = (details, examid, answerid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/answer/${user._id}/${examid}/${answerid}`,
    "PUT",
    details
  );
  if (!error) {
    return true;
  } else {
    return false;
  }
};

export const exitAnswer = (msg, examid, answerid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/answer/exit/${user._id}/${examid}/${answerid}`,
    "PUT",
    { exited: msg }
  );
  if (!error) {
    return true;
  } else {
    return false;
  }
};

// get answer list of hosted exam of host
export const getHostedExamAnswerList = (examid) => async (dispatch) => {
  let user = getUser().user;
  const { response, error } = await axiosHook(
    `/host/answers/${user._id}/${examid}`
  );
  if (!error) {
    return response.data;
  } else {
    return false;
  }
};

// get answer of candidate of given exam
export const getCandidateAnswer =
  (examid, candidateid = null) =>
  async (dispatch) => {
    let user = getUser().user;
    const { response, error } = await axiosHook(
      `/candidate/answer/${user._id}/${examid}`,
      "POST",
      { candidateid: candidateid || user._id }
    );
    if (!error) {
      return response.data;
    } else {
      return false;
    }
  };
