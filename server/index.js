import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();
const corsOptions = {
  origin: [
    "https://netflix-mern-s80220ak.vercel.app/",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
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
