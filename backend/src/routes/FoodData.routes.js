import { Router } from "express";

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

export default foodDataRoutes;