import React from "react";
import { useSelector } from "react-redux";
import { Post } from "./Post/Post";
import useStyles from './styles';

export const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  
  return (
    <Post/>
  );
};
