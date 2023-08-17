import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import useStyles from './styles';
import { Posts } from "./components/Posts/Posts";
import { Form } from "./components/Form/Form";

/* 
    Container centers your content horizontally
    Grow helps to add a growing or enlarging transition, 
    providing a better interface for the user. (animation, basically)
*/

const App = () => {
  const classes = useStyles();

  return (
    <Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          {/* Takes the full width (12) on large devices, and 7 on small ones */}
          <Grid item xs={12} sm={7}>
            <Posts/>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Form/>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default App;
