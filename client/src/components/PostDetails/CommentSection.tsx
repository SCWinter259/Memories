import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../redux/actions/posts";
import { getUser } from "../../utils/UtilFunctions";
import { DisplayComments } from "./DisplayComments";
import { CommentBox } from "./CommentBox";

interface CommentSectionProps {
  post: any;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = getUser();
  const commentsRef = useRef<HTMLDivElement>(null);

  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleClick = () => {
    const finalComment = `${user?.result.name}: ${comment}`;
    if(post._id) dispatch(commentPost(finalComment, post._id));

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
