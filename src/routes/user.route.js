import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get('/register',registerUser);

export default userRouter