import { addTask, showTasks, updateStatus } from "../controllers/Task.js";
import express from "express";
const router = express.Router();

router.get("/showTasks", showTasks);

router.post("/addTask", addTask);

router.delete("/deleteTask/:title", );

router.put("/updateStatus/:title", updateStatus);

export { router as TaskRouter };
