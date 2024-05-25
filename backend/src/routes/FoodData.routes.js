import { Router } from "express";
import {
  createFoodItem,
  deleteFoodItem,
  getAllFoodItems,
  updateFoodItem,
} from "../controllers/FoodItems.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";

const foodDataRoutes = Router();

foodDataRoutes.get("/fooditems", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

foodDataRoutes.route("/maindish").get(getAllFoodItems);

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
  .get(jwtMiddleware, adminMiddleware, getAllFoodItems);
foodDataRoutes
  .route("/create/item")
  .post(
    jwtMiddleware,
    adminMiddleware,
    upload.single("img"),
    createFoodItem
  );

foodDataRoutes.route("/admin/maindishes").get(jwtMiddleware, adminMiddleware, getAllFoodItems)
foodDataRoutes.route("/admin/maindishes/:id").put(jwtMiddleware, adminMiddleware,upload.single("img") ,updateFoodItem)
foodDataRoutes.route("/admin/maindishes/delete/:id").delete(jwtMiddleware, adminMiddleware, deleteFoodItem)


export default foodDataRoutes;
