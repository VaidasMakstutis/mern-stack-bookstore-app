import express from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with default of cors(*)
app.use(cors());

// Option 2: Allow Customs Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack BookStore App");
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
