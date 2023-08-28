import React, { ChangeEvent, useState } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import { AuthButtons } from "./AuthButtons";
import { AuthHeader } from "./AuthHeader";
import { AuthFields } from "./AuthFields";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (isSignup) {
      // we pass the history object so that we can navigate once something happens
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // name is from the name prop in the Input component
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
      dispatch({ type: AUTH, data: { result, token } });

      // move user to home page after login
      history.push("/");
    } catch (error) {
      console.log(error);
    }

    console.log(res);
  };

  const googleError = () => {
    console.log("Failed to login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <AuthHeader isSignup={isSignup} />
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <AuthFields
              isSignup={isSignup}
              changeHandler={changeHandler}
              showPassword={showPassword}
              showPasswordHandler={showPasswordHandler}
            />
          </Grid>
          <AuthButtons
            isSignup={isSignup}
            googleSuccess={googleSuccess}
            googleError={googleError}
            switchMode={switchMode}
          />
        </form>
      </Paper>
    </Container>
  );
};
