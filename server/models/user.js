import mongoose from "mongoose";

// schema works kinda like SQLite
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

// above is a schema, here we export a model (like a SQLite table)
const User = mongoose.model("User", userSchema);

export default User;
