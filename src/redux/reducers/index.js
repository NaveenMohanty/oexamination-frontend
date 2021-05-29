import { combineReducers } from "redux";
import engineReducer from "./engine";
import ecommerceReducer from "./ecommerce";

const rootReducer = combineReducers({
  engine: engineReducer,
  ecommerce: ecommerceReducer,
});

export default rootReducer;
