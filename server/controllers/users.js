import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the email in database
    const existingUser = await User.findOne({ email });

    // if there is no such email
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    // use bcrypt to compare hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // if the password is incorrect
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // if things are fine, sign a web token
    // test is just a key (name of token)
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    // find the email in the database
    const existingUser = await User.findOne({ email });

    // if the email aka user already existed
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // if the password is not the same as the confirm password
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    // usually people use 12 as the level of difficulty to hash passwords.
    const hashedPassword = await bcrypt.hash(password, 12);

    // if everything is find, create a new user in the database
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // sign a web token
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
