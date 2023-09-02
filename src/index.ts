import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { clientRouter } from "./routes/Client.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(clientRouter);

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});