import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { PostType } from "../../types/PostType";
import { useHistory } from "react-router-dom";

interface FormProps {
  currentId: string | number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<any>>;
}

export const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
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
      ? state.posts.posts.find((item: PostType) => item._id === currentId)
      : null
  );

  const user = JSON.parse(String(localStorage.getItem("profile")));
  const history = useHistory();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleTitleChange = (event: any) => {
    setPostData({ ...postData, title: event.target.value });
  };

  const handleMessageChange = (event: any) => {
    setPostData({ ...postData, message: event.target.value });
  };

  const handleTagsChange = (event: any) => {
    setPostData({ ...postData, tags: event.target.value.split(",") });
  };

  const handleSelectedFile = ({ base64 }: any) => {
    setPostData({ ...postData, selectedFile: base64 });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
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
