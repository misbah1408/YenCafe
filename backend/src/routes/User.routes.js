import { Router } from "express";
import { User } from "../models/User.model.js";
import { body, validationResult } from "express-validator";

const router = Router();
router.post(
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
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
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

router.post(
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
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      if (req.body.password !== userData.password) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      return res.json({
        message: "success",
      });
    } catch {
      res.status(400).json({
        message: "error",
      });
    }
  }
);
export default router;
