import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grow, Grid } from "@material-ui/core";
import { Posts } from "../Posts/Posts";
import { Form } from "../Form/Form";
import { getPosts } from "../../actions/posts";

/* 
    Container centers your content horizontally
    Grow helps to add a growing or enlarging transition, 
    providing a better interface for the user. (animation, basically)
*/

export const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Grid
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
  );
};
