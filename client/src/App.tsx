import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import useStyles from "./styles";
import { Posts } from "./components/Posts/Posts";
import { Form } from "./components/Form/Form";
import { NavBar } from "./components/NavBar/NavBar";
import "./index.css";

/* 
    Container centers your content horizontally
    Grow helps to add a growing or enlarging transition, 
    providing a better interface for the user. (animation, basically)
*/

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container>
      <NavBar/>
      <Grow in>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          {/* Takes the full width (12) on large devices, and 7 on small ones */}
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default App;
