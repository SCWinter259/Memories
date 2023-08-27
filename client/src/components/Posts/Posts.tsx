import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import { Post } from "./Post/Post";
import useStyles from "./styles";
import { PostType } from "../../interfaces/PostType";

interface PostsProps {
  setCurrentId: React.Dispatch<React.SetStateAction<any>>;
}

export const Posts: React.FC<PostsProps> = ({ setCurrentId }) => {
  const posts = useSelector((state: any) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post: PostType) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
