import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentPost
} from "../controllers/posts.js";

import { auth } from "../middleware/auth.js";

// set up the router
const router = express.Router();

// set up the routes
// this is reached through localhost:5000/posts,
// because we add a prefix of /posts to all the routes here
// Functionalities for the routes are defined in controllers folder
router.get("/", getPosts);

// the user needs to be authenticated before
// making a post => has to go through middleware
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post("/:id/commentPost", commentPost);

export default router;
