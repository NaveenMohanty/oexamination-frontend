import useApiHook from "../../services/useApiHook";

import axios from "../../services/axios";

import { cardValidation, updateCardValidation } from "../../validation";
import { addModel } from "./model";
import { addQuery } from "./query";
import { tagUserToSubscription } from "./service";
import { billingDetailsForUser } from "./userList";
import { CHECK_STRIPE_ACCOUNT, GET_PAYMENT_OPTIONS } from "../types";
import permissionCheck from "../../services/usePermissionCheck";

/**
 * Redux actons for payment gateway
 * @module redux/actions/payment
 */

/**
 * get token details from stripe
 * @param {Object} paymentData
 * @returns {string}
 */

// get token details from stripe
export const paymentStripe = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    data,
    "/stripe",
    cardValidation
  );

  if (response) {
    return response.data.id;
  } else {
    return false;
  }
};

export const addCard = (stripeToken) => async (dispatch) => {
  const { response } = await useApiHook("POST", { stripeToken }, "/addcard");
  if (response) {
    dispatch(checkStripeAccount());
    return true;
  } else {
    return false;
  }
};

export const cardUpdate = (data) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    data,
    "/card-update",
    updateCardValidation
  );
  if (response) {
    dispatch(checkStripeAccount());
    return true;
  } else {
    return false;
  }
};

export const deleteCard = (data) => async (dispatch) => {
  const { response } = await useApiHook("POST", data, "/card-delete");

  if (response) {
    dispatch(checkStripeAccount());
    return true;
  } else {
    return false;
  }
};

/**
 * charge money through stripe
 * @param {string} stripeToken
 * @returns {string}
 */
// charge money through stripe
export const chargeStripe = (details) => async (dispatch) => {
  const { response } = await useApiHook("POST", details, "/charge");
  if (response) {
    return true;
  } else {
    return false;
  }
};

export const checkStripeAccount = (stripeToken) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/stripeusercheck");
  console.log(response);
  if (
    response &&
    response.data.value &&
    response.data.cards_details.data
  ) {
    dispatch({ type: CHECK_STRIPE_ACCOUNT, payload: response.data });
    return response.data;
  } else {
    dispatch({ type: CHECK_STRIPE_ACCOUNT, payload: null });
  }
};

export const directStripePayment = (details) => async (dispatch) => {
  const { response } = await useApiHook("POST", details, "/directpayment");

  if (response) {
    return true;
  } else return false;
};

export const refundStripePayment = (details, userId) => async (dispatch) => {
  const { response } = await useApiHook(
    "POST",
    details,
    "/backend/refundstripe"
  );

  if (response) {
    await dispatch(billingDetailsForUser(userId));
    return true;
  } else return false;
};

export const userInvoice = (id) => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, `/genrateinvoice/${id}`);

  if (response) {
    console.log(response.data);
    return response.data;
  } else {
    return "";
  }
};

//   const { response } = permissionCheck("paymentmethod_view") ? await useApiHook("GET", {}, "/backend/paymentoptions") : { response: false }
export const getPaymentOptions = () => async (dispatch) => {
  const { response } = await useApiHook("GET", {}, "/backend/paymentoptions");

  if (response) {
    dispatch({ type: GET_PAYMENT_OPTIONS, payload: response.data });
  }
};

export const selectPaymentOptions = (data) => async (dispatch) => {
  const { active, id } = data;
  const { response } = await useApiHook(
    "PATCH",
    { active },
    `/backend/paymentoptions/${id}`
  );

  if (response) {
    dispatch(getPaymentOptions());
    return true;
  } else {
    return false;
  }
};

export const paypalProcessPost = (price) => async (dispatch) => {
  const datas = {
    amount: price,
    return_url: "http://127.0.0.1:5000/nuwebapp/api/v1/paypalprocess",
    cancel_url: "http://127.0.0.1:5000/nuwebapp/api/v1/paypalprocess",
  };

  let params = {
    method: "POST",
    url: "/paypal",
    data: datas,
  };

  const response = await axios(params);
  // const { response } = await useApiHook("POST", data, "/paypal");
  if (response) {
    console.log(response.data.url);
    let url = response.data.url;
    window.open(url);
  }
};
