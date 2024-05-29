import { Router } from "express";
import { loginUser, registerUser } from "../controllers/CreateUser.controller.js";

const userRoutes = Router();

// User registration route
userRoutes.route("/register").post(registerUser)
// User login route
userRoutes.route("/login").post(loginUser)

export default userRoutes;
