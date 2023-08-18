import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { PostInterface } from "../../interfaces/PostInterface";

interface FormProps {
  currentId: string | number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<any>>;
}

export const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  // find the post with the correct id that needs to be updated
  const post = useSelector((state: any) =>
    currentId
      ? state.posts.find((item: PostInterface) => item._id === currentId)
      : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleCreatorChange = (event: any) => {
    setPostData({ ...postData, creator: event.target.value });
  };

  const handleTitleChange = (event: any) => {
    setPostData({ ...postData, title: event.target.value });
  };

  const handleMessageChange = (event: any) => {
    setPostData({ ...postData, message: event.target.value });
  };

  const handleTagsChange = (event: any) => {
    setPostData({ ...postData, tags: event.target.value });
  };

  const handleSelectedFile = ({ base64 }: any) => {
    setPostData({ ...postData, selectedFile: base64 });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleCreatorChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleTitleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleMessageChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleTagsChange}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={handleSelectedFile} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
