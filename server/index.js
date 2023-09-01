import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js"; // import the route
import userRoutes from "./routes/users.js";

const app = express(); // initialize the app
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); // limit is 30mb for images
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// use express middleware to connect the route to the application
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => res.send("APP IS RUNNING"));

// it seems like we cannot do a process.env.PORT below because
// the code below is in a promise
const host = '0.0.0.0';
const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://scwinter:scwinter123123@cluster0.qqixjgx.mongodb.net/?retryWrites=true&w=majority";

// connect to the database
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, host, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// makes sure that we don't get any warnings in the console
// mongoose.set("useFindAndModify", false); -> deprecated
