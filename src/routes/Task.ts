import {
  addTask,
  deleteTask,
  showTasks,
  updateStatus,
} from "../controllers/Task.js";
import express from "express";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/showTasks", verifyToken, showTasks);

router.post("/addTask", verifyToken, addTask);

router.delete("/deleteTask/:title", verifyToken, deleteTask);

router.put("/updateStatus/:title", verifyToken, updateStatus);

export { router as TaskRouter };
