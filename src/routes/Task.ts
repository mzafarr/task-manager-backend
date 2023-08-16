import express from "express";
const router = express.Router();
import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";

router.get("/showTasks", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists." });
    }
    const userTasks = user.tasks;
    if (userTasks.length === 0) {
      return res.status(200).json({ message: "No remaining tasks." });
    }
    res.status(200).json({ userTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/addTask", async (req, res) => {
  const { userId, title, description, dueDate, status } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User doesn't exists." });
  }
  const newTask = new TaskModel({ title, description, dueDate, status });
  try {
    await newTask.save();
    const savedTask = await newTask.save();
    user.tasks.push(savedTask._id);
    return res
      .status(200)
      .json({ message: "Task successfully added", savedTask });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});
export { router as TaskRouter };
