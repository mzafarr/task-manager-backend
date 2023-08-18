import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userRouter } from "./routes/User.js";
import { TaskRouter } from "./routes/Task.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/User", userRouter);
app.use("/Task", TaskRouter);

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
