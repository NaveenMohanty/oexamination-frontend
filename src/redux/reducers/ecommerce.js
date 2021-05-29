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

const initialState = {
    paypalList: [],
    stripeList: [],
};

const ecommerceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PAYPAL_CONFIG:
            return {
                ...state,
                paypalList: payload,
            };

        case POST_PAYPAL_CONFIG:
            return {
                ...state,
                paypalList: [payload, ...state.paypalList],
            };


        case PATCH_PAYPAL_CONFIG:
            return {
                ...state,
                paypalList: [
                    payload,
                    ...state.paypalList.filter(
                        (paypal) => paypal.id !== payload.id
                    ),
                ],
            };

        case DELETE_PAYPAL_CONFIG:
            return {
                ...state,
                paypalList: state.paypalList.filter(
                    (paypal) => paypal.id !== payload
                ),
            };



        case GET_STRIPE_CONFIG:
            return {
                ...state,
                stripeList: payload,
            };

        case POST_STRIPE_CONFIG:
            return {
                ...state,
                stripeList: [payload, ...state.stripeList],
            };

        case PATCH_STRIPE_CONFIG:
            return {
                ...state,
                stripeList: [
                    payload,
                    ...state.stripeList.filter(
                        (stripe) => stripe.id !== payload.id
                    ),
                ],
            };

        case DELETE_STRIPE_CONFIG:
            return {
                ...state,
                stripeList: state.stripeList.filter(
                    (stripe) => stripe.id !== payload
                ),
            };

        default:
            return state;
    }
};

export default ecommerceReducer;
