import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";
import { PostType } from "../interfaces/PostTypes";

export const reducer = (state = [], action: { type: string; payload: any }) => {
  // in this reducer, state is always posts
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      // if the post has the same id, replace with new post,
      // otherwise return the same post
      return state.map((post: PostType) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post: PostType) => post._id !== action.payload);
    case LIKE:
      return state.map((post: PostType) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return state;
  }
};
