import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";

interface FormFieldsProps {
  postData: {
    title: string;
    message: string;
    tags: string[];
    selectedFile: string;
  };
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedFile: ({ base64 }: any) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  postData,
  handleTitleChange,
  handleMessageChange,
  handleTagsChange,
  handleSelectedFile,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
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
    </Fragment>
  );
};
