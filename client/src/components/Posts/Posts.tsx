import React from "react";
import { Post } from "./Post/Post";
import useStyles from './styles';

export const Posts: React.FC = () => {
  const classes = useStyles();
  
  return (
    <Post/>
  );
};
