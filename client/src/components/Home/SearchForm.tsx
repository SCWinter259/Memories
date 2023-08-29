import React from "react";
import { AppBar, TextField, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";

interface SearchFormProps {
  handleKeyPress: (event: React.KeyboardEvent) => void;
  search: string;
  onSearchChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tags: string[];
  handleAdd: (tag: string) => void;
  handleDelete: (tagToDelete: string) => void;
  searchPost: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  handleKeyPress,
  search,
  onSearchChangeHandler,
  tags,
  handleAdd,
  handleDelete,
  searchPost,
}) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <TextField
        name="search"
        variant="outlined"
        label="Search Memories"
        onKeyDown={handleKeyPress}
        fullWidth
        value={search}
        onChange={onSearchChangeHandler}
      />
      <ChipInput
        style={{ margin: "10px 0" }}
        value={tags}
        onAdd={handleAdd}
        onDelete={handleDelete}
        label="Search Tags"
        variant="outlined"
      />
      <Button
        onClick={searchPost}
        className={classes.appBarSearch}
        variant="contained"
        color="primary"
      >
        Search
      </Button>
    </AppBar>
  );
};
