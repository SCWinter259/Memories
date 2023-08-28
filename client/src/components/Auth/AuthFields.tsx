import React, { Fragment } from "react";
import { Input } from "./Input";

interface AuthFieldsProps {
  isSignup: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  showPasswordHandler: () => void;
}

export const AuthFields: React.FC<AuthFieldsProps> = ({
  isSignup,
  changeHandler,
  showPassword,
  showPasswordHandler,
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
