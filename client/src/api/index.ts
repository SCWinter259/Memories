import axios from "axios";
import { FormDataType } from "../types/FormDataType";
import { getUser } from "../utils/UtilFunctions";

// axios is used to make api calls (send requests) to our own backend
const API = axios.create({ baseURL: "https://memoriesscwinter-262d3f9778d9.herokuapp.com/" });

// a function that is called on each of our requests
// this happens before each requests
// we need this because we have to send our token to our
// middleware to verify that we are logged in
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    // the string token has to start with Bearer
    req.headers.authorization = `Bearer ${getUser()?.token}`;
  }

  return req;
});

export const fetchPosts = (page: string | 1) => API.get(`/posts?page=${page}`);
export const createPost = (newPost: any) => API.post("/posts", newPost);
export const updatePost = (id: string, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery: any) =>
  API.get(
    `posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPost = (id: string) => API.get(`/posts/${id}`);
export const comment = (value: string, id: string) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData: FormDataType) =>
  API.post("/user/signin", formData);
export const signUp = (formData: FormDataType) =>
  API.post("/user/signup", formData);