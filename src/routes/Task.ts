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

router
  .route("/:title")
  .delete(verifyToken, deleteTask)
  .put(verifyToken, updateStatus);

export { router as TaskRouter };
