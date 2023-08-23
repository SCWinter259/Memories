import React, { Fragment, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import { LockOutlined } from "@material-ui/icons";
import { Input } from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { CredentialType } from "../../interfaces/CredentialType";

export const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const submitHandler = () => {};

  const changeHandler = () => {};

  const showPasswordHandler = () => {
    return setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res: any) => {
    const decoded: CredentialType = jwt_decode(res.credential);

    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    console.log(decoded);
  };

  const googleError = () => {
    console.log("Failed to login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignup && (
              <Fragment>
                <Input
                  name="firstName"
                  label="First Name"
                  changeHandler={changeHandler}
                  autoFocus
                  half
                />
                <Input
                  name="firstName"
                  label="First Name"
                  changeHandler={changeHandler}
                  half
                />
              </Fragment>
            )}
            <Input
              name="email"
              label="Email Address"
              changeHandler={changeHandler}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              changeHandler={changeHandler}
              type={showPassword ? "text" : "password"}
              showPasswordHandler={showPasswordHandler}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                changeHandler={changeHandler}
                type="password"
              ></Input>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container className={classes.googleButton} justifyContent="center">
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleError}
              text={isSignup ? "signup_with" : "signin_with"}
              theme="filled_blue"
              size="medium"
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
