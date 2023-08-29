import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

interface DisplayCommentsProps {
  comments: string[];
  commentsRef: React.RefObject<HTMLDivElement>;
}

export const DisplayComments: React.FC<DisplayCommentsProps> = ({
  comments,
  commentsRef,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.commentsInnerContainer}>
      <Typography gutterBottom variant="h6">
        Comments
      </Typography>
      {comments.map((comment: string, index: number) => (
        <Typography key={index} gutterBottom variant="subtitle1">
          <strong>{comment.split(": ")[0]}</strong>
          {comment.split(":")[1]}
        </Typography>
      ))}
      <div ref={commentsRef} />
    </div>
  );
};
