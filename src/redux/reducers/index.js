import { combineReducers } from "redux";
import loaderReducer from "./loader";
import userReducer from "./user";
import alertReducer from "./alert";

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  alert: alertReducer,
});

export default rootReducer;
