import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";

interface CommentBoxProps {
  comment: string;
  commentChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

export const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  commentChangeHandler,
  handleClick,
}) => {
  return (
    <div style={{ width: "70%" }}>
      <Typography gutterBottom variant="h6">
        Write a comment
      </Typography>
      <TextField
        fullWidth
        minRows={4}
        variant="outlined"
        label="Comment"
        multiline
        value={comment}
        onChange={commentChangeHandler}
      />
      <Button
        style={{ marginTop: "10px" }}
        fullWidth
        disabled={!comment}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Comment
      </Button>
    </div>
  );
};
