import { Router } from "express";
import { User } from "../models/User.model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRoutes = Router();

// User registration route
userRoutes.post(
  "/register",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Username must be between 5 and 10 characters").isLength({ min: 5, max: 10 }),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        name,
        password: hashedPassword,
        email,
        location,
      });

      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// User login route
userRoutes.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const validPassword = await bcrypt.compare(password, userData.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const payload = {
        user: {
          id: userData.id,
        },
      };
      const isAdmin = {
        isAdmin: userData.isAdmin,
      }

      const authToken = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ message: "success", authToken,  isAdmin});
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

export default userRoutes;
