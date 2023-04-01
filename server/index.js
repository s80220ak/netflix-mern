import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connecting to mongodb...");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
