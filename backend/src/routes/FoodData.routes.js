import { Router } from "express";

const foodDataRoutes = Router();

foodDataRoutes.post("/fooditems", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

export default foodDataRoutes;