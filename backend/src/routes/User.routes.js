import { Router } from "express";
import { User } from "../models/User.model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRoutes = Router();
userRoutes.post(
  "/register",
  [
    body("email", "Enter Your Mail").isEmail(),
    body("name", "Invalid UserName").isLength({ min: 5, max: 10 }),
    body("password", "invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.status(200).json({
        message: "success",
      });
    } catch {
      res.status(400).json({
        message: "error",
      });
    }
  }
);

userRoutes.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "User not exists" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!validPassword) {
        return res
          .status(400)
          .json({ errors: "Invalid Password" });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      return res.json({
        message: "success", authToken
      });
    } catch {
      res.status(400).json({
        message: "error",
      });
    }
  }
);
export default userRoutes;
