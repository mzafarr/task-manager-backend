import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userRouter } from "./routes/User.js";
import { TaskRouter } from "./routes/Task.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use("/User", userRouter);
app.use("/Task", TaskRouter);
// Connect to MongoDB
mongoose.connect(process.env.DATABASE);
// Check if the connection was successful
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=index.js.map