import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../redux/actions/posts";
import { getUser } from "../../utils/UtilFunctions";
import { DisplayComments } from "./DisplayComments";
import { CommentBox } from "./CommentBox";
import { PostType } from "../../types/PostType";

interface CommentSectionProps {
  post: PostType;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = getUser();
  const commentsRef = useRef<HTMLDivElement>(null);

  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleClick = () => {
    const finalComment = `${user?.result.name}: ${comment}`;
    dispatch(commentPost(finalComment, post._id));

    setComments([...comments, finalComment]);
    setComment("");

    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <DisplayComments comments={comments} commentsRef={commentsRef} />
        {user?.result?.name && (
          <CommentBox
            comment={comment}
            commentChangeHandler={commentChangeHandler}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};
