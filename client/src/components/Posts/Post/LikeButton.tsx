import React, { Fragment } from "react";
import { ThumbUpAlt, ThumbUpAltOutlined } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { UserType } from "../../../types/UserType";

interface LikeButtonProps {
  likes: string[];
  hasLikedPost: string | undefined;
  user: UserType | undefined | null;
  handleLikeButtonClick: () => Promise<void>;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  likes,
  hasLikedPost,
  user,
  handleLikeButtonClick,
}) => {
  const likeText = likes.length > 1 ? "likes" : "like";

  const manyLikes = (
    <Fragment>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;{likes.length} {likeText}
    </Fragment>
  );

  const manyLikesWithUser = (
    <Fragment>
      <ThumbUpAlt fontSize="small" />
      &nbsp;
      {likes.length > 2
        ? `You and ${likes.length - 1} others`
        : `${likes.length} ${likeText}`}
    </Fragment>
  );

  const noLike = (
    <Fragment>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;Like
    </Fragment>
  );

  let buttonAndText = null;

  if (likes.length > 0) {
    buttonAndText = hasLikedPost ? manyLikesWithUser : manyLikes;
  } else {
    buttonAndText = noLike;
  }

  return (
    <Button
      size="small"
      color="primary"
      disabled={!user?.result}
      onClick={handleLikeButtonClick}
    >
      {buttonAndText}
    </Button>
  );
};
