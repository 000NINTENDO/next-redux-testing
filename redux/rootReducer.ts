import { combineReducers } from "redux";
import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/users/usersSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
