import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { PostType } from "../../types/PostType";
import { useHistory } from "react-router-dom";
import { NotLoggedInMessage } from "./NotLoggedInMessage";
import { FormButtons } from "./FormButtons";
import { FormFields } from "./FormFields";

interface FormProps {
  currentId: string | number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<any>>;
}

const initialState = {
  title: "",
  message: "",
  tags: [""],
  selectedFile: "",
};

export const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialState);
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, title: event.target.value });
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, message: event.target.value });
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, tags: event.target.value.split(",") });
  };

  const handleSelectedFile = ({ base64 }: any) => {
    setPostData({ ...postData, selectedFile: base64 });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData(initialState);
  };

  if (!user?.result?.name) {
    return <NotLoggedInMessage />;
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
        <FormFields
          postData={postData}
          handleTitleChange={handleTitleChange}
          handleMessageChange={handleMessageChange}
          handleTagsChange={handleTagsChange}
          handleSelectedFile={handleSelectedFile}
        />
        <FormButtons clear={clear} />
      </form>
    </Paper>
  );
};
