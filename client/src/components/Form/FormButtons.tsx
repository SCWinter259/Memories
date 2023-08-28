import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

interface FormButtonsProps {
  clear: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ clear }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        className={classes.buttonSubmit}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
      <Button
        className={classes.buttonSubmit}
        variant="contained"
        color="secondary"
        size="small"
        onClick={clear}
        fullWidth
      >
        Clear
      </Button>
    </Fragment>
  );
};
