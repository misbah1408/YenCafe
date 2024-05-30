import { body, validationResult } from "express-validator";
import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = [
  // Validation middleware
  body("email", "Enter a valid email").isEmail(),
  body("name", "Username must be between 5 and 10 characters").isLength({
    min: 5,
    max: 10,
  }),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),

  // Controller function
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userEmail = await User.findOne({
        $or: [{ email: email }],
      });
      const userName = await User.findOne({
        $or: [{ name: name }],
      });
      if (userEmail) {
        return res.status(400).json({ message: "Existed Email" });
      }
      if (userName) {
        return res.status(400).json({ message: "User Name already used" });
      }

      await User.create({
        name,
        password: hashedPassword,
        email,
      });

      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
];

export const loginUser = [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ message: "Email does not exist" });
      }

      const validPassword = await bcrypt.compare(password, userData.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const isAdmin = {
        isAdmin: userData.isAdmin,
      };

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ message: "success", authToken, isAdmin });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
];

export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    // Check if the password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
