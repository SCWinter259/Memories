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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event: any) => {
    event.preventDefault();

    if(isSignup) {
      // we pass the history object so that we can navigate once something happens
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const changeHandler = (event: any) => {
    // name is from the name prop in the Input component
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const showPasswordHandler = () => {
    return setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type: 'AUTH', data: {result, token}});

      // move user to home page after login
      history.push('/')
    } catch (error) {
      console.log(error);
    }

    console.log(res);
    console.log('log in okay');
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
                  name="lastName"
                  label="Last Name"
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
