import express from "express";
const router = express.Router();
import { signIn, signUp } from '../controllers/User.js';

router.post("/signUp", signUp);

router.post("/signIn", signIn);

export { router as userRouter };