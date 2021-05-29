import {
  IS_LOGGED_IN,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  TWO_FA,
  GET_REFUND,
  GET_USER_PROFILE,
  GET_USER_PERMISSIONS,
} from "../types";
import history from "../../utils/createHistory";
import useApiHook from "../../services/useApiHook";
import { clear, addUserStatus, addUserData, getUserData } from "../../utils/localStorage";
import {
  signUpValidation,
  logInValidation,
  confirmPasswordValidation,
  otpValidatn,
  phoneNumberValidatn,
  forgotPasswordValidation,
  userChangePswrdValidation,
  otpPhoneNumberValidatn,
} from "../../validation";
/**
 * Redux actons for user Signin and SignUp process.
 * @module redux/actions/user
 */

/**
 * Action creater for signing up users
 * @param {Object} details - details{ email: string, password: string}
 * @return {void}
 */
export const signUp = (details) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    details,
    "/registration",
    signUpValidation
  );
  if (response) {
    dispatch({ type: SIGN_UP, payload: details.email });
    history.push("/emailverification");
  }
};

/**
 * Log-in Action
 * @param {Object} details - details{ email: string, password: string}
 * @return {Void}
 */
export const logIn = (details) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    details,
    "/login",
    logInValidation
  );

  if (response) {
    const email = details.email;
    let { access_token, user_id: userId, auth, tour } = response.data;
    const userData = {
      userId,
      access_token,
      auth,
      email,
      tour,
      is_admin: false,
    };
    addUserData(userData);
    dispatch({ type: LOG_IN, payload: userData });

    if (tour) {
      dispatch({ type: IS_LOGGED_IN, payload: true });
      addUserStatus(true);
      history.replace("/profileform");
    } else {
      dispatch({ type: TWO_FA, payload: true });
    }
  } else {
    dispatch({ type: SIGN_UP, payload: details.email });
  }
};

/**
 * Log-in Action
 * @param {Object} details - details{ email: string, password: string}
 * @return {Void}
 */
export const logInAdmin = (details) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    details,
    "/admin-login",
    logInValidation
  );

  if (response) {
    const email = details.email;
    let { access_token, user_id: userId, role_id: roleId } = response.data;

    if (roleId === null) {
      roleId = -1;
    }

    const userData = { userId, access_token, email, is_admin: true, roleId };
    addUserData(userData);
    addUserStatus(true);
    dispatch({ type: LOG_IN, payload: userData });
    dispatch({ type: IS_LOGGED_IN, payload: true });
  } else {
    dispatch({ type: SIGN_UP, payload: details.email });
  }
};

/**
 * Otp verification action
 * @param {number} otp - OTP user gets as SMS
 * @param {method} getState - get user Details like email and auth token
 * @returns {boolean} - true if 2fa auth is successfull else false
 */
export const verifyOtp = (otp, isRedirect, setTwo) => async (dispatch, getState) => {
  const email = getState().user.email;
  const token = getState().user.token;
  const details = {
    token: otp,
    email,
  };

  const { response } = await useApiHook("POST", details, "/auth", otpValidatn);
  if (response) {
    if (!token) {
      addUserStatus(true);
      dispatch({ type: TWO_FA, payload: false });
      dispatch({ type: IS_LOGGED_IN, payload: true });
      isRedirect && history.push("/");
      setTwo && setTwo(); 
    } else dispatch({ type: TWO_FA, payload: false });
  } else {
    return false;
  }
};

/**
 * Verify Email action
 * @param {string} email - email provided by user
 * @returns {void}
 */
export const verifyMail = (email) => async (dispatch) => {
  const { response } = await useApiHook("POST", { email }, "/confirmagain");
};

/**
 * verify phone number using otp (done for completing 2FA)
 * @param {number} otp - user gets in SMS
 * @param {number} phoneNumber - user phone number
 * @returns {void}
 */
export const verifyPhoneNumber =
  (otp, phoneNumber) => async (dispatch, getState) => {
    // checks on input field
    const { email, token, phoneNo } = getState().user;
    const details = {
      token: otp,
      phone_no: phoneNumber || phoneNo,
      email,
    };
    const { response } = await useApiHook(
      "POST",
      details,
      "/verifyauth",
      otpValidatn
    );
    if (response) {
      if (!token) {
        const userData = getUserData() ? { ...getUserData() } : {};
        userData.auth = true;
        addUserStatus(true);
        addUserData(userData);
        dispatch({ type: IS_LOGGED_IN, payload: true });
        dispatch({ type: LOG_IN, payload: userData });
        history.push("/");
      }

      dispatch({ type: TWO_FA, payload: false });
    }
  };
/**
 * Email confirm mail received by user
 * @param {string} token - user auth token
 * @returns {boolean} - true if confirmation is successful else false
 */
export const confirmMail = (token) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/confirm/${token}`);
  if (response) {
    setTimeout(() => history.push("/login"), 2000);
    return true;
  } else {
    return false;
  }
};
/**
 * Confirm Password action
 * @param {object} details - Details of user
 * @returns {boolean} - true if successful
 */
export const confirmPassword = (details) => async (dispatch, getState) => {
  const user = getState().user;
  const { response } = await useApiHook(
    "POST",
    details,
    `/forgot/new/${user.token}`,
    confirmPasswordValidation
  );
  if (response && user.token) {
    delete user.token;
    dispatch({ type: LOG_IN, payload: user });
    setTimeout(() => history.push("/login"), 1000);
    return true;
  } else {
    return false;
  }
};

export const resetPassword = (details) => async () => {
  const { response } = await useApiHook(
    "POST",
    details,
    "/user-pwd-reset",
    userChangePswrdValidation
  );
  if (response) {
    console.log("response", response);
    return true;
  } else return false;
};
/**
 * User will register his number for 2FA
 * @param {number} phone_no - User Phone Number
 * @returns {boolean}
 */
export const addPhoneNumber = (phone_no) => async (dispatch) => {
  // checks on input field
  const { response } = await useApiHook(
    "POST",
    { phone_no },
    "/setauth",
    otpPhoneNumberValidatn
  );
  if (response) {
    return true;
  } else {
    return false;
  }
};
/**
 * User to recover password.
 * @param {string} email
 * @returns {void}
 */
export const forgotPassword = (email) => async (dispatch) => {
  // checks on input field
  const { response } = await useApiHook(
    "POST",
    { email },
    "/forgot",
    forgotPasswordValidation
  );
  if (response) {
    dispatch({ type: SIGN_UP, payload: email });
    return true;
  } else {
    return false;
  }
};
/**
 * Update user profile details
 * @param {Object} details - Updated user details
 * @returns {void}
 */
export const updateUserProfile = (details) => async (dispatch, getState) => {
  // checks on input field
  let userData = getState().user;

  const { response } = await useApiHook(
    "PATCH",
    details,
    `/details/${userData.userId}`
  );
  if (response) {
    if (details.phone_no && details.phone_no.split("-")[1]) {
      if (await dispatch(resendOtp(userData.email))) {
        userData = {
          ...userData,
          auth: false,
          phoneNo: details.phone_no,
        };

        addUserData(userData);
        dispatch({ type: LOG_IN, payload: userData });
        dispatch({ type: TWO_FA, payload: true });
      }
    } else history.push("/");
  }
};

export const getUserProfile = (id) => async (dispatch, getState) => {
  // checks on input field
  let userData = getState().user;

  const { response } = await useApiHook(
    "GET",
    {},
    `/details/${id || userData.userId}`
  );
  if (response) {
    console.log(response);
    const { users, ...rest } = response.data;
    dispatch({ type: GET_USER_PROFILE, payload: response.data });
  }
};

/**
 * Resend OTP for 2FA
 * @param {string} emailId
 * @returns {boolean}
 */
export const resendOtp = (emailId) => async (dispatch, getState) => {
  const email = emailId || getState().user.email;

  const { response } = await useApiHook("POST", { email }, "/resendotp");
  if (response) {
    return true;
  } else {
    return false;
  }
};
/**
 * Get user email and auth token fron token
 * @param {string} token
 * @returns {void}
 */
export const getDataFromToken = (token) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/getdata/${token}`);
  if (response) {
    const { email, auth } = response.data;
    if (auth) {
      if (!(await dispatch(resendOtp(email))))
        throw new Error("Error while sending otp");
    }
    const userData = { email, auth, token };
    addUserData(response.data);
    dispatch({ type: LOG_IN, payload: userData });
    dispatch({ type: TWO_FA, payload: true });
  }
};

export const getRefundData = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/refunddata");
  if (response) {
    const data = response.data;
    dispatch({ type: GET_REFUND, payload: data });
  }
};

export const userSessionCheck = () => async (dispatch, getState) => {
  const token = getState().user.token;
  const { response } = await useApiHook("POST", { token }, "checktoken");
  if (response) {
    console.log(response);
  }
};

/**
 * logout action creator
 * @returns {void}
 */
// logout action creator
export const logOut = (isAdmin) => async (dispatch) => {
  const { response } = await useApiHook("POST", {}, "/logout/access");
  if (response) {
    clear();
    dispatch({ type: LOG_OUT });
  }
};

export const disableTour = () => async (dispatch, getState) => {
  const userData = getState().user;
  console.log("getting executed");
  console.log(userData.isLoggedIn);
  if (userData.isLoggedIn) {
    userData.tour = false;
    addUserData(userData);
    dispatch({ type: LOG_IN, payload: userData });
  }
};

export const getUserPermissions = (id) => async (dispatch) => {
  const { response } = await useApiHook(
    "GET",
    {},
    `/backend/rolesubgroups/${id}`
  );
  if (response) {
    dispatch({ type: GET_USER_PERMISSIONS, payload: response.data });
  }
};
