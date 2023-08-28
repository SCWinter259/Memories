import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";

export const NotLoggedInMessage = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please Sign In to create your own memories and like other's memories
      </Typography>
    </Paper>
  );
};
