import React, { Fragment } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import moment from "moment";
import { PostType } from "../../../types/PostType";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

interface PostProps {
  post: PostType;
  setCurrentId: React.Dispatch<React.SetStateAction<any>>;
}

export const Post: React.FC<PostProps> = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(String(localStorage.getItem("profile")));

  const handleEditButtonClick = () => {
    setCurrentId(post._id);
  };

  const handleLikeButtonClick = () => {
    dispatch(likePost(post._id));
  };

  const handleDeleteButtonClick = () => {
    dispatch(deletePost(post._id));
  };

  // a mini component to change the 'like' and 'likes'
  // in plural and singular cases
  const Likes = () => {
    const numberOfLikes = post.likes.length;
    const gId = user?.result?.googleId;
    const myId = user?.result?._id;
    const likeText = numberOfLikes > 1 ? "likes" : "like";

    if (numberOfLikes > 0) {
      return post.likes.find((like) => like === (gId || myId)) ? (
        <Fragment>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {numberOfLikes > 2
            ? `You and ${numberOfLikes - 1} others`
            : `${numberOfLikes} ${likeText}`}
        </Fragment>
      ) : (
        <Fragment>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{numberOfLikes} {likeText}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </Fragment>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={handleEditButtonClick}
          >
            <MoreHoriz fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikeButtonClick}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={handleDeleteButtonClick}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
