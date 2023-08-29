import { Dispatch } from "redux";
import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
import { PostType } from "../types/PostType";
import { History } from "history";

// action creators are functions that return an action
export const getPosts =
  (page: string | 1) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: START_LOADING });

      const {
        data: { data, currentPage, numberOfPages },
      } = await api.fetchPosts(page);

      dispatch({
        type: FETCH_ALL,
        payload: { data, currentPage, numberOfPages },
      });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost =
  (post: PostType, history: History) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.createPost(post);

      history.push(`/posts/${data._id}`);

      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updatePost =
  (id: string, post: PostType) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch =
  (searchQuery: { search: string; tags: string }) =>
  async (dispatch: Dispatch<any>) => {
    try {
      // the data fetched has the data property
      dispatch({ type: START_LOADING });

      const {
        data: { data },
      } = await api.fetchPostsBySearch(searchQuery);

      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

export const getPost = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost =
  (value: string, id: string) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.comment(value, id);

      dispatch({ type: COMMENT, payload: data });

      return data.comments;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
