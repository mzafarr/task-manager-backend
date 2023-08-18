import express from "express";
const router = express.Router();
import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";

router.get("/showTasks", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User doesn't exists.");
    }

    const userTasks = await TaskModel.find({ user: user._id });
    console.log(userTasks);
    res.send(userTasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
});

router.post("/addTask", async (req, res) => {
  const { userEmail, title, description, dueDate, status } = req.body;
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).send("User doesn't exists.");
  }
  const newTask = new TaskModel({
    title,
    description,
    dueDate,
    status,
    user: user._id,
  });
  try {
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save(); // Save the user after updating tasks
    return res.status(200).send(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error.");
  }
});

router.delete("/deleteTask/:title", async (req, res) => {
  const { title } = req.params;
  const userId = req.query.userId;
  try {
    await TaskModel.findOneAndDelete({ title: title, user: userId });
    res.send("Task deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
export { router as TaskRouter };
