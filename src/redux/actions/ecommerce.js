import {
    GET_PAYPAL_CONFIG,
    POST_PAYPAL_CONFIG,
    PAYPAL_ACTIVATE,
    DELETE_PAYPAL_CONFIG,
    GET_STRIPE_CONFIG,
    POST_STRIPE_CONFIG,
    STRIPE_ACTIVATE,
    DELETE_STRIPE_CONFIG,
    PATCH_PAYPAL_CONFIG,
    PATCH_STRIPE_CONFIG,
} from "../types";
import { paypalValidation, stripeValidation } from "../../validation";
import useApiHook from "../../services/useApiHook";

/**
 * Redux actions for ecommerce
 * @module redux/actions/ecommerce
 */

/**
 * get paypal-config data.
 * @returns {void}
 */
export const getPaypalConfig = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/paypal-config");

    if (response) {
        dispatch({ type: GET_PAYPAL_CONFIG, payload: response.data });
    }
};
/**
 * post paypal-config data
 * @param {Object} paypalData
 * @returns {boolean}
 */
export const postPaypalConfig = (paypalData) => async (dispatch) => {
    const { response } = await useApiHook("POST", paypalData, "/backend/paypal-config", paypalValidation);

    if (response) {
        dispatch(getPaypalConfig());
        return true;
    } else {
        return false;
    }
};
/**
 * patch paypal-config data
 * @param {Object} paypalData
 * @returns {boolean}
 */
export const patchPaypalConfig = (paypalData) => async (dispatch) => {
    const { response } = await useApiHook(
        "PATCH",
        paypalData,
        `/backend/paypal-config/${paypalData.id}`,
        paypalValidation
    );

    if (response) {
        dispatch({ type: PATCH_PAYPAL_CONFIG, payload: paypalData });
        return true;
    } else {
        return false;
    }
};
/**
 * paypal activate request.
 * @param {Object} paypalData
 * @returns {boolean}
 */
export const paypalActivate = (paypalData) => async (dispatch) => {
    const { response } = await useApiHook("POST", paypalData, `/backend/paypal-activate/${paypalData.id}`);

    if (response) {
        dispatch(getPaypalConfig());
        return true;
    } else {
        return false;
    }
};
/**
 * delete paypal config
 * @param {string} id
 * @returns {boolean}
 */
export const deletePaypalConfig = (id) => async (dispatch) => {
    const { response } = await useApiHook("DELETE", {}, `/backend/paypal-config/${id}`);

    if (response) {
        dispatch({ type: DELETE_PAYPAL_CONFIG, payload: id });
        return true;
    } else {
        return false;
    }
};
/*************************************************************************************************************/

/**
 * get stripe-config data.
 * @returns {void}
 */
export const getStripeConfig = () => async (dispatch) => {
    const { response } = await useApiHook("GET", {}, "/backend/stripe-config");

    if (response) {
        dispatch({ type: GET_STRIPE_CONFIG, payload: response.data });
    }
};
/**
 * post stripe-config data
 * @param {Object} stripeData
 * @returns {boolean}
 */
export const postStripeConfig = (stripeData) => async (dispatch) => {
    const { response } = await useApiHook("POST", stripeData, "/backend/stripe-config", stripeValidation);

    if (response) {
        dispatch(getStripeConfig());
        return true;
    } else {
        return false;
    }
};
/**
 * patch stripe-config data
 * @param {Object} stripeData
 * @returns {boolean}
 */
export const patchStripeConfig = (stripeData) => async (dispatch) => {
    const { response } = await useApiHook(
        "PATCH",
        stripeData,
        `/backend/stripe-config/${stripeData.id}`,
        stripeValidation
    );

    if (response) {
        dispatch({ type: PATCH_STRIPE_CONFIG, payload: stripeData });
        return true;
    } else {
        return false;
    }
};
/**
 * stripe activate request.
 * @param {Object} stripeData
 * @returns {boolean}
 */
export const stripeActivate = (stripeData) => async (dispatch) => {
    const { response } = await useApiHook("POST", stripeData, `/backend/stripe-activate/${stripeData.id}`);

    if (response) {
        dispatch(getStripeConfig());
        return true;
    } else {
        return false;
    }
};
/**
 * delete stripe config
 * @param {string} id
 * @returns {boolean}
 */
export const deleteStripeConfig = (id) => async (dispatch) => {
    const { response } = await useApiHook("DELETE", {}, `/backend/stripe-config/${id}`);

    if (response) {
        dispatch({ type: DELETE_STRIPE_CONFIG, payload: id });
        return true;
    } else {
        return false;
    }
};