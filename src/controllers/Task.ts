import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";

export const showTasks = async (req, res) => {
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
};

export const addTask = async (req, res) => {
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
};

export const deleteTask = async (req, res) => {
  const { title } = req.params;
  const userEmail = req.query.userEmail;
  try {
    await TaskModel.findOneAndDelete({ title: title, user: userEmail });
    res.send("Task deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { userEmail, newStatus } = req.body;
    const taskTitle = req.query.title;

    const updatedTask = await TaskModel.findOneAndUpdate(
      { title: taskTitle, user: userEmail },
      {
        status: newStatus,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.json({
      message: "Password updated successfully",
      password: updatedTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
