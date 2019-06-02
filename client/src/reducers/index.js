import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  task: taskReducer,
  auth: authReducer,
  error: errorReducer
});