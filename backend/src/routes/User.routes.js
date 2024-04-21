import { Router } from "express";
import { User } from "../models/User.model.js";

const router = Router();
router.route("/register").post(async (req, res) => {
  console.log(req.body.name)
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
});


export default router