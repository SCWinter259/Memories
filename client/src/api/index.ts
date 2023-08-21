import axios from 'axios';
import { PostType } from '../interfaces/PostType';

// axios is used to make api calls to our own backend

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: PostType) => axios.post(url, newPost);
export const updatePost = (id: string, updatedPost: PostType) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id: string) => axios.delete(`${url}/${id}`);
export const likePost = (id: string) => axios.patch(`${url}/${id}/likePost`);