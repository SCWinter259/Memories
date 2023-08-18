import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

// set up the router
const router = express.Router();

// set up the routes
// this is reached through localhost:5000/posts, 
// because we add a prefix of /posts to all the routes here
// Functionalities for the routes are defined in controllers folder
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost)

export default router;