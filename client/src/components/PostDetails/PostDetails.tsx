import React, { useEffect } from "react";
import {
  Paper,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { CommentSection } from "./CommentSection";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../redux/actions/posts";
import { RecommendedPosts } from "./RecommendedPosts";
import DefaultImage from "../../images/DefaultImage.png";
import { PostContent } from "./PostContent";

export const PostDetails = () => {
  console.log("the state in PostDetails:", useSelector((state: any) => state))
  const { post, posts, isLoading } = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("First useEffect loaded")
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log("Second useEffect loaded")
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // current post cannot be in the recommended posts
  const recommendedPosts = posts.filter(
    ({ _id }: any) => _id !== post._id
  );

  const openPost = (_id: string | undefined) => {
    history.push(`/posts/${_id}`);
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <PostContent post={post} />
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile || DefaultImage}
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <RecommendedPosts
          recommendedPosts={recommendedPosts}
          openPost={openPost}
        />
      )}
    </Paper>
  );
};
