import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Posts } from "../Posts/Posts";
import { Form } from "../Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { Paginate } from "../Pagination";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";

/* 
    Container centers your content horizontally
    Grow helps to add a growing or enlarging transition, 
    providing a better interface for the user. (animation, basically)

    useLocation tells where are we, useHistory helps us to get back to
    where we were
*/

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const onSearchChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // search for post
      searchPost();
    }
  };

  const handleAdd = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch => fetch search post
      // tags has to be render to a string because we cannot pass an
      // array through the url parameter
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          {/* Takes the full width (12) on large devices, and 6 on small ones */}
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
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
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
