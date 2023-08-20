import { combineReducers } from "redux";
import { reducer as posts } from "./posts";

export const reducers =  combineReducers({
  posts,
});
