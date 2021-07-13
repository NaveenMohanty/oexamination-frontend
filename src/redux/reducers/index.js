import { combineReducers } from "redux";
import loaderReducer from "./loader";
import userReducer from "./user";
import alertReducer from "./alert";
import examReducer from "./exam";

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  alert: alertReducer,
  exam: examReducer,
});
export default rootReducer;
