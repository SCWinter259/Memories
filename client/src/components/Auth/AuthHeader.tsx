import React, { Fragment } from "react";
import { Avatar, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./styles";

interface AuthHeaderProps {
  isSignup: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ isSignup }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
    </Fragment>
  );
};
