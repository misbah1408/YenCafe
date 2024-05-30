import { Router } from "express";
import { forgotPassword, loginUser, registerUser } from "../controllers/CreateUser.controller.js";

const userRoutes = Router();

// User registration route
userRoutes.route("/register").post(registerUser)
// User login route
userRoutes.route("/login").post(loginUser)
//User forgotPassword
userRoutes.route("/update-password").post(forgotPassword)
export default userRoutes;
