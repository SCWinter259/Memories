import React, { Fragment } from "react";
import { Button, Grid } from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";

import useStyles from "./styles";

interface AuthButtonsProps {
  isSignup: boolean;
  googleSuccess: (res: any) => Promise<void>;
  googleError: () => void;
  switchMode: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
  isSignup,
  googleSuccess,
  googleError,
  switchMode,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
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
    </Fragment>
  );
};
