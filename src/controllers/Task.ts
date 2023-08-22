import ErrorHandler from "../middlewares/error.js";
import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";

export const showTasks = async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    const userTasks = await TaskModel.find({ user: user._id });
    console.log(userTasks);
    res.send(userTasks);
  } catch (error) {
    next(error);
  }
};

export const addTask = async (req, res, next) => {
  const { userEmail, title, description, dueDate, status } = req.body;
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) {
    return next(new ErrorHandler("Task not found", 404));
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
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { title } = req.params;
  const userEmail = req.query.userEmail;
  try {
    await TaskModel.findOneAndDelete({ title: title, user: userEmail });
    res.send("Task deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
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
    return next(new ErrorHandler("Task not found", 404));
    }

    res.json({
      message: "Password updated successfully",
      password: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};
