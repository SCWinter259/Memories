import { combineReducers } from "redux";
import { reducer as posts } from "./posts";
import { authReducer as auth } from "./auth";

export const reducers =  combineReducers({
  posts,
  auth
});
