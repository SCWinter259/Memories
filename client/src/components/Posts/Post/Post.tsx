import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";
import { useHistory } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { getUser } from "../../../utils/UtilFunctions";
import DefaultImage from "../../../images/DefaultImage.png";
import { DeleteButton } from "./DeleteButton";
import { TextBody } from "./TextBody";
import { EditButton } from "./EditButton";

interface PostProps {
  post: any;
  setCurrentId: React.Dispatch<React.SetStateAction<any>>;
}

export const Post: React.FC<PostProps> = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = getUser();
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?._id;

  const hasLikedPost = likes?.find((like: string) => like === userId);

  const handleEditButtonClick = () => {
    setCurrentId(post._id);
  };

  const handleLikeButtonClick = async () => {
    dispatch(likePost(post._id));

    // if user has liked the post then clicking the button again shall dislike
    if (hasLikedPost) {
      setLikes(post.likes.filter((id: string) => id !== userId));
    } else if (userId && !hasLikedPost) {
      setLikes([...post.likes, userId]);
    }
  };

  const handleDeleteButtonClick = () => {
    dispatch(deletePost(post._id));
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          style={{ height: "12rem", paddingTop: "0px" }}
          component="img"
          className={classes.media}
          image={post.selectedFile || DefaultImage}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {userId === post?.creator && (
          <EditButton handleEditButtonClick={handleEditButtonClick} />
        )}
        <TextBody post={post} />
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <LikeButton
          likes={likes}
          hasLikedPost={hasLikedPost}
          user={user}
          handleLikeButtonClick={handleLikeButtonClick}
        />
        {userId === post?.creator && (
          <DeleteButton handleDeleteButtonClick={handleDeleteButtonClick} />
        )}
      </CardActions>
    </Card>
  );
};
