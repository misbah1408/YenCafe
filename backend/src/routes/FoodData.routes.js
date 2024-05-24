import { Router } from "express";
import {
  createFoodItem,
  getAllFoodItems,
} from "../controllers/FoodItems.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import authenticateToken from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const foodDataRoutes = Router();

foodDataRoutes.get("/fooditems", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

foodDataRoutes.get("/maindish", (req, res) => {
  try {
    res.send([global.mainDish]);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

foodDataRoutes.get("/breakfast", (req, res) => {
  try {
    res.send([global.breakFast]);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

foodDataRoutes
  .route("/fooddata")
  .get(authenticateToken, adminMiddleware, getAllFoodItems);
foodDataRoutes
  .route("/create/item")
  .post(
    authenticateToken,
    adminMiddleware,
    upload.single("img"),
    createFoodItem
  );

export default foodDataRoutes;
