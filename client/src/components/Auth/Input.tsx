import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface InputFieldProps {
  name: string;
  changeHandler: (event: any) => void;
  label: string;
  half?: boolean;
  autoFocus?: boolean;
  type?: string;
  showPasswordHandler?: () => void;
}

export const Input: React.FC<InputFieldProps> = ({
  name,
  changeHandler,
  label,
  half,
  autoFocus,
  type,
  showPasswordHandler,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={changeHandler}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPasswordHandler}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};
