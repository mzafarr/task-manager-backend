import express from "express";
const router = express.Router();
import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";

router.get("/showTasks", async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists." });
    }
    const userTasks = user.tasks || [];

    res.status(200).json({ userTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/addTask", async (req, res) => {
  const { userEmail, title, description, dueDate, status } = req.body;
  const user = await UserModel.findOne({ email: userEmail });
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
