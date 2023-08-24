import axios from "axios";
import { PostType } from "../interfaces/PostType";
import { FormDataType } from "../interfaces/FormDataType";

// axios is used to make api calls (send requests) to our own backend
const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost: PostType) => API.post("/posts", newPost);
export const updatePost = (id: string, updatedPost: PostType) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => axios.delete(`/posts/${id}`);
export const likePost = (id: string) => axios.patch(`/posts/${id}/likePost`);

export const signIn = (formData: FormDataType) =>
  API.post("/user/signin", formData);
export const signUp = (formData: FormDataType) =>
  API.post("/user/signup", formData);
