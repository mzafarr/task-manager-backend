import { jwt } from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return next(new ErrorHandler("This email is already registered", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ name, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userEmail: user.email });
};
