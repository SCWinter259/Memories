import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import { PostType } from "../types/PostType";

export const reducer = (
  state = { isLoading: true, posts: [] },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return { ...state, posts: [action.payload] };
    case UPDATE:
      // if the post has the same id, replace with new post,
      // otherwise return the same post
      return {
        ...state,
        posts: state.posts.map((post: PostType) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(
          (post: PostType) => post._id !== action.payload
        ),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post: PostType) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
