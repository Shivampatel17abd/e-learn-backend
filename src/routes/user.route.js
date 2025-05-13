import { Router } from "express";
import { registerUser,login, logoutuser } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post('/register',registerUser);             //  http://localhost:8000/api/v1/user/register
userRouter.post('/login',login);                       // http://localhost:8000/api/v1/user/login
userRouter.post('/logout',logoutuser)                  // http://localhost:8000/api/v1/user/logout     

export default userRouter