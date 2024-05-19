import { Router } from "express";
import { Order } from "../models/Order.model.js"; // Import the Order model
import jwt from "jsonwebtoken";

const orderData = Router();

orderData.post("/checkout", async (req, res) => {
  try {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    // console.log(token)

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    // Extract the user ID from the decoded token
    const userId = decoded?.user?.id;
    // console.log(userId)

    // Ensure cartItems is present in the request body
    const cartItems = req.body;
    // console.log(cartItems)
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items are required" });
    }

    // Save the order to the database, associating it with the user
    const newOrder = new Order({
      orderData: cartItems,
      userId, // Add userId to the order
    });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

orderData.get("/orders", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "JWT token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.user?.id;

    const orders = await Order.find({ userId });
    // console.log(orders)
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default orderData;
